import { getRoomHistory } from "./rooms.history.service.js";

export async function history(req, res) {
  const data = await getRoomHistory(
    req.user.id,
    req.params.roomId
  );

  res.json(data);
}
