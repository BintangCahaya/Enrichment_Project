import { db } from "../../db/database.js";

export async function getRoomHistory(ownerId, roomId) {
  // ownership check via room
  const room = await db.get(
    `SELECT id FROM rooms WHERE id = ? AND owner_id = ?`,
    [roomId, ownerId]
  );

  if (!room) {
    throw new Error("Room not found");
  }

  return db.all(
    `SELECT
        t.id,
        t.name,
        t.phone,
        t.check_in_date,
        t.check_out_date
     FROM tenants t
     WHERE t.room_id = ? AND t.owner_id = ?
     ORDER BY t.check_in_date DESC`,
    [roomId, ownerId]
  );
}
