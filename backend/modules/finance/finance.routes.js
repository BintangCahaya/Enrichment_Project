import { Router } from "express";
import { authRequired } from "../../middleware/auth.middleware.js";
import {
  createRent,
  listRents,
  addPayment,
  tenantLedger
} from "./finance.controller.js";

const router = Router();

router.use(authRequired);

router.post("/rents", createRent);
router.get("/rents", listRents);

router.post("/payments", addPayment);
router.get("/tenants/:tenantId/ledger", tenantLedger);

export default router;
