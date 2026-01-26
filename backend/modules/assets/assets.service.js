import { db } from "../../db/database.js";

async function roomOwnedByUser(ownerId, roomId) {
  return db.get(
    `SELECT id FROM rooms WHERE id = ? AND owner_id = ?`,
    [roomId, ownerId]
  );
}

export async function createAsset(ownerId, roomId, data) {
  if (!(await roomOwnedByUser(ownerId, roomId))) {
    throw new Error("Room not found");
  }

  const { name, condition, notes } = data;

  const result = await db.run(
    `INSERT INTO assets (owner_id, room_id, name, condition, notes)
     VALUES (?, ?, ?, ?, ?)`,
    [ownerId, roomId, name, condition ?? "good", notes]
  );

  return getAsset(ownerId, result.lastID);
}

export function listAssets(ownerId, roomId) {
  return db.all(
    `SELECT *
     FROM assets
     WHERE owner_id = ? AND room_id = ?
     ORDER BY created_at DESC`,
    [ownerId, roomId]
  );
}

export function getAsset(ownerId, assetId) {
  return db.get(
    `SELECT *
     FROM assets
     WHERE id = ? AND owner_id = ?`,
    [assetId, ownerId]
  );
}

export async function updateAsset(ownerId, assetId, data) {
  const existing = await getAsset(ownerId, assetId);
  if (!existing) throw new Error("Asset not found");

  const name = data.name ?? existing.name;
  const condition = data.condition ?? existing.condition;
  const notes = data.notes ?? existing.notes;

  await db.run(
    `UPDATE assets
     SET name = ?, condition = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND owner_id = ?`,
    [name, condition, notes, assetId, ownerId]
  );

  return getAsset(ownerId, assetId);
}

export async function deleteAsset(ownerId, assetId) {
  await db.run(
    `DELETE FROM assets
     WHERE id = ? AND owner_id = ?`,
    [assetId, ownerId]
  );
}
