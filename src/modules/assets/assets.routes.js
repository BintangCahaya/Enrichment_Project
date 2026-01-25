import { Router } from "express";
import { authRequired } from "../../middleware/auth.middleware.js";
import {
  create,
  list,
  get,
  update,
  remove
} from "./assets.controller.js";
import assetLogsRoutes from "../asset_logs/asset_logs.routes.js";

const router = Router({ mergeParams: true });

router.use(authRequired);

// Asset CRUD
router.post("/", create);
router.get("/", list);
router.get("/:assetId", get);
router.put("/:assetId", update);
router.delete("/:assetId", remove);

// 📘 Asset logbook (history)
router.use("/:assetId/logs", assetLogsRoutes);

export default router;
