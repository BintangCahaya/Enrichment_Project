import { db } from "../../db/database.js";

export async function createRentService(ownerId, data) {
  const { tenant_id, amount, period, due_date } = data;

  await db.run(
    `INSERT INTO rents (owner_id, tenant_id, amount, period, due_date)
     VALUES (?, ?, ?, ?, ?)`,
    [ownerId, tenant_id, amount, period, due_date]
  );
}

export async function listRentsService(ownerId) {
  return db.all(
    `SELECT r.*, t.name AS tenant_name
     FROM rents r
     JOIN tenants t ON t.id = r.tenant_id
     WHERE r.owner_id = ?`,
    [ownerId]
  );
}

export async function addPaymentService(ownerId, data) {
  const { tenant_id, rent_id, amount, paid_at, note } = data;

  await db.run(
    `INSERT INTO payments (owner_id, tenant_id, rent_id, amount, paid_at, note)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [ownerId, tenant_id, rent_id, amount, paid_at, note]
  );
}

export async function tenantLedgerService(ownerId, tenantId) {
  const rents = await db.all(
    `SELECT * FROM rents
     WHERE owner_id = ? AND tenant_id = ?`,
    [ownerId, tenantId]
  );

  const payments = await db.all(
    `SELECT * FROM payments
     WHERE owner_id = ? AND tenant_id = ?`,
    [ownerId, tenantId]
  );

  const totalRent = rents.reduce((s, r) => s + r.amount, 0);
  const totalPaid = payments.reduce((s, p) => s + p.amount, 0);

  return {
    rents,
    payments,
    summary: {
      total_rent: totalRent,
      total_paid: totalPaid,
      balance: totalRent - totalPaid
    }
  };
}
