import { db } from "../../db/database.js";

async function assetOwnedByUser(ownerId, assetId) {
  return db.get(
    `SELECT id FROM assets WHERE id = ? AND owner_id = ?`,
    [assetId, ownerId]
  );
}

export async function addAssetLog(ownerId, assetId, data) {
  if (!(await assetOwnedByUser(ownerId, assetId))) {
    throw new Error("Asset not found");
  }

  const { action, note } = data;

  const result = await db.run(
    `INSERT INTO asset_logs (owner_id, asset_id, action, note)
     VALUES (?, ?, ?, ?)`,
    [ownerId, assetId, action, note]
  );

  return db.get(
    `SELECT * FROM asset_logs WHERE id = ?`,
    [result.lastID]
  );
}

export function listAssetLogs(ownerId, assetId) {
  return db.all(
    `SELECT *
     FROM asset_logs
     WHERE owner_id = ? AND asset_id = ?
     ORDER BY created_at DESC`,
    [ownerId, assetId]
  );
}
