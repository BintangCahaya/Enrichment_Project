import { Router } from "express";
import { authRequired } from "../../middleware/auth.middleware.js";
import {
  create,
  list,
  get,
  update,
  remove
} from "./rooms.controller.js";
import { history } from "./rooms.history.controller.js";
import assetsRoutes from "../assets/assets.routes.js";

const router = Router({ mergeParams: true });

router.use(authRequired);

// Room CRUD
router.post("/", create);
router.get("/", list);
router.get("/:roomId", get);
router.put("/:roomId", update);
router.delete("/:roomId", remove);

// 📘 Room history
router.get("/:roomId/history", history);

// 🧰 Room assets (CRUD)
router.use("/:roomId/assets", assetsRoutes);

export default router;
