import {
    createKos,
    getAllKos,
    getKosById,
    updateKos,
    deleteKos
  } from "./kos.service.js";
  
  export async function create(req, res) {
    const kos = await createKos(req.user.id, req.body);
    res.status(201).json(kos);
  }
  
  export async function list(req, res) {
    const data = await getAllKos(req.user.id);
    res.json(data);
  }
  
  export async function get(req, res) {
    const kos = await getKosById(req.user.id, req.params.id);
    if (!kos) {
      return res.status(404).json({ message: "Kos not found" });
    }
    res.json(kos);
  }
  
  export async function update(req, res) {
    const kos = await updateKos(
      req.user.id,
      req.params.id,
      req.body
    );
    res.json(kos);
  }
  
  export async function remove(req, res) {
    await deleteKos(req.user.id, req.params.id);
    res.status(204).end();
  }
  