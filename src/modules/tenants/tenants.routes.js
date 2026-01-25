import { Router } from "express";
import { authRequired } from "../../middleware/auth.middleware.js";
import {
  checkIn,
  list,
  update,
  checkOut
} from "./tenants.controller.js";

const router = Router();

router.use(authRequired);

router.post("/check-in", checkIn);
router.get("/", list);
router.put("/:id", update);
router.post("/:id/check-out", checkOut);

export default router;
