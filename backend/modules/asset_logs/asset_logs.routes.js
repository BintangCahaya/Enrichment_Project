import { Router } from "express";
import { authRequired } from "../../middleware/auth.middleware.js";
import {
  create,
  list
} from "./asset_logs.controller.js";

const router = Router({ mergeParams: true });

router.use(authRequired);

/**
 * 📘 Asset Logbook
 * /rooms/:roomId/assets/:assetId/logs
 */
router.post("/", create);
router.get("/", list);

export default router;
