import { db } from "../../db/database.js";

async function roomOwnedByUser(ownerId, roomId) {
  const room = await db.get(
    `SELECT id, status FROM rooms
     WHERE id = ? AND owner_id = ?`,
    [roomId, ownerId]
  );
  return room;
}

export async function checkInTenant(ownerId, data) {
  const { room_id, name, phone, check_in_date } = data;

  const room = await roomOwnedByUser(ownerId, room_id);
  if (!room) {
    throw new Error("Room not found");
  }

  if (room.status === "occupied") {
    throw new Error("Room already occupied");
  }

  // create tenant
  const result = await db.run(
    `INSERT INTO tenants (owner_id, room_id, name, phone, check_in_date)
     VALUES (?, ?, ?, ?, ?)`,
    [ownerId, room_id, name, phone, check_in_date]
  );

  const tenantId = result.lastID;

  // update room status
  await db.run(
    `UPDATE rooms SET status = 'occupied' WHERE id = ?`,
    [room_id]
  );

  // ✅ LOG ROOM HISTORY (check-in)
  await db.run(
    `INSERT INTO room_history
     (owner_id, room_id, tenant_id, action, notes)
     VALUES (?, ?, ?, 'check_in', ?)`,
    [ownerId, room_id, tenantId, `Tenant ${name} checked in`]
  );
}

export async function listTenants(ownerId) {
  return db.all(
    `SELECT t.*, r.name AS room_name
     FROM tenants t
     JOIN rooms r ON r.id = t.room_id
     WHERE t.owner_id = ? AND t.check_out_date IS NULL`,
    [ownerId]
  );
}

/**
 * ✅ SAFE tenant profile update
 * - Only active tenants
 * - Only name & phone
 */
export async function updateTenant(ownerId, tenantId, data) {
  const tenant = await db.get(
    `SELECT id, name, phone
     FROM tenants
     WHERE id = ? AND owner_id = ? AND check_out_date IS NULL`,
    [tenantId, ownerId]
  );

  if (!tenant) {
    throw new Error("Active tenant not found");
  }

  const name = data.name ?? tenant.name;
  const phone = data.phone ?? tenant.phone;

  await db.run(
    `UPDATE tenants
     SET name = ?, phone = ?
     WHERE id = ?`,
    [name, phone, tenantId]
  );

  return {
    id: tenantId,
    name,
    phone
  };
}

export async function checkOutTenant(ownerId, tenantId, check_out_date) {
  const tenant = await db.get(
    `SELECT * FROM tenants
     WHERE id = ? AND owner_id = ? AND check_out_date IS NULL`,
    [tenantId, ownerId]
  );

  if (!tenant) {
    throw new Error("Active tenant not found");
  }

  // update tenant
  await db.run(
    `UPDATE tenants
     SET check_out_date = ?
     WHERE id = ?`,
    [check_out_date, tenantId]
  );

  // update room
  await db.run(
    `UPDATE rooms SET status = 'available'
     WHERE id = ?`,
    [tenant.room_id]
  );

  // ✅ LOG ROOM HISTORY (check-out)
  await db.run(
    `INSERT INTO room_history
     (owner_id, room_id, tenant_id, action, notes)
     VALUES (?, ?, ?, 'check_out', ?)`,
    [
      ownerId,
      tenant.room_id,
      tenantId,
      `Tenant ${tenant.name} checked out`
    ]
  );
}
