import { Router } from "express";
import { authRequired } from "../../middleware/auth.middleware.js";
import {
  create,
  list,
  get,
  update,
  remove
} from "./kos.controller.js";
import roomsRoutes from "../rooms/rooms.routes.js";

const router = Router();

router.use(authRequired);

// Kos CRUD
router.post("/", create);
router.get("/", list);
router.get("/:id", get);
router.put("/:id", update);
router.delete("/:id", remove);

// Nested Rooms under Kos
router.use("/:kosId/rooms", roomsRoutes);

export default router;
