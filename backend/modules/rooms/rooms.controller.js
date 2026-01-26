import {
    createRoom,
    listRooms,
    getRoom,
    updateRoom,
    deleteRoom
  } from "./rooms.service.js";
  
  export async function create(req, res) {
    const room = await createRoom(
      req.user.id,
      req.params.kosId,
      req.body
    );
    res.status(201).json(room);
  }
  
  export async function list(req, res) {
    const rooms = await listRooms(
      req.user.id,
      req.params.kosId
    );
    res.json(rooms);
  }
  
  export async function get(req, res) {
    const room = await getRoom(
      req.user.id,
      req.params.roomId
    );
  
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
  
    res.json(room);
  }
  
  export async function update(req, res) {
    const room = await updateRoom(
      req.user.id,
      req.params.roomId,
      req.body
    );
    res.json(room);
  }
  
  export async function remove(req, res) {
    await deleteRoom(
      req.user.id,
      req.params.roomId
    );
    res.status(204).end();
  }
  