import {
    createAsset,
    listAssets,
    getAsset,
    updateAsset,
    deleteAsset
  } from "./assets.service.js";
  
  export async function create(req, res) {
    const asset = await createAsset(
      req.user.id,
      req.params.roomId,
      req.body
    );
    res.status(201).json(asset);
  }
  
  export async function list(req, res) {
    const assets = await listAssets(
      req.user.id,
      req.params.roomId
    );
    res.json(assets);
  }
  
  export async function get(req, res) {
    const asset = await getAsset(
      req.user.id,
      req.params.assetId
    );
  
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
  
    res.json(asset);
  }
  
  export async function update(req, res) {
    const asset = await updateAsset(
      req.user.id,
      req.params.assetId,
      req.body
    );
    res.json(asset);
  }
  
  export async function remove(req, res) {
    await deleteAsset(
      req.user.id,
      req.params.assetId
    );
    res.status(204).end();
  }
  