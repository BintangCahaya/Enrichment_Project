import { db } from "../../db/database.js";

async function kosOwnedByUser(ownerId, kosId) {
  const kos = await db.get(
    `SELECT id FROM kos WHERE id = ? AND owner_id = ?`,
    [kosId, ownerId]
  );
  return !!kos;
}

export async function createRoom(ownerId, kosId, data) {
  if (!(await kosOwnedByUser(ownerId, kosId))) {
    throw new Error("Kos not found");
  }

  const { name, price } = data;

  const result = await db.run(
    `INSERT INTO rooms (kos_id, owner_id, name, price)
     VALUES (?, ?, ?, ?)`,
    [kosId, ownerId, name, price]
  );

  return {
    id: result.lastID,
    name,
    price
  };
}

export async function listRooms(ownerId, kosId) {
  return db.all(
    `SELECT id, name, price, status, created_at
     FROM rooms
     WHERE kos_id = ? AND owner_id = ?`,
    [kosId, ownerId]
  );
}

export async function getRoom(ownerId, roomId) {
  return db.get(
    `SELECT * FROM rooms
     WHERE id = ? AND owner_id = ?`,
    [roomId, ownerId]
  );
}

export async function updateRoom(ownerId, roomId, data) {
    const existing = await getRoom(ownerId, roomId);
  
    if (!existing) {
      throw new Error("Room not found");
    }
  
    const name = data.name ?? existing.name;
    const price = data.price ?? existing.price;
    const status = data.status ?? existing.status;
  
    await db.run(
      `UPDATE rooms
       SET name = ?, price = ?, status = ?
       WHERE id = ? AND owner_id = ?`,
      [name, price, status, roomId, ownerId]
    );
  
    return getRoom(ownerId, roomId);
  }  

export async function deleteRoom(ownerId, roomId) {
  await db.run(
    `DELETE FROM rooms
     WHERE id = ? AND owner_id = ?`,
    [roomId, ownerId]
  );
}
