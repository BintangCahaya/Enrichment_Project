import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import kosRoutes from "../modules/kos/kos.routes.js";
import tenantsRoutes from "../modules/tenants/tenants.routes.js";
import financeRoutes from "../modules/finance/finance.routes.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/kos", kosRoutes);
router.use("/tenants", tenantsRoutes);
router.use("/finance", financeRoutes);

// test route
router.get("/me", authRequired, (req, res) => {
  res.json({ user: req.user });
});

export default router;
