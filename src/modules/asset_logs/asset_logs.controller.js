import {
    addAssetLog,
    listAssetLogs
  } from "./asset_logs.service.js";
  
  export async function create(req, res) {
    const log = await addAssetLog(
      req.user.id,
      req.params.assetId,
      req.body
    );
    res.status(201).json(log);
  }
  
  export async function list(req, res) {
    const logs = await listAssetLogs(
      req.user.id,
      req.params.assetId
    );
    res.json(logs);
  }
  