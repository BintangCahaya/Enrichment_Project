import { db } from "../../db/database.js";

export async function createKos(ownerId, data) {
  const { name, address } = data;

  const result = await db.run(
    `INSERT INTO kos (owner_id, name, address)
     VALUES (?, ?, ?)`,
    [ownerId, name, address]
  );

  return {
    id: result.lastID,
    name,
    address
  };
}

export async function getAllKos(ownerId) {
  return db.all(
    `SELECT id, name, address, created_at
     FROM kos
     WHERE owner_id = ?`,
    [ownerId]
  );
}

export async function getKosById(ownerId, kosId) {
  return db.get(
    `SELECT id, name, address, created_at
     FROM kos
     WHERE id = ? AND owner_id = ?`,
    [kosId, ownerId]
  );
}

export async function updateKos(ownerId, kosId, data) {
  const { name, address } = data;

  await db.run(
    `UPDATE kos
     SET name = ?, address = ?
     WHERE id = ? AND owner_id = ?`,
    [name, address, kosId, ownerId]
  );

  return getKosById(ownerId, kosId);
}

export async function deleteKos(ownerId, kosId) {
  await db.run(
    `DELETE FROM kos
     WHERE id = ? AND owner_id = ?`,
    [kosId, ownerId]
  );
}
