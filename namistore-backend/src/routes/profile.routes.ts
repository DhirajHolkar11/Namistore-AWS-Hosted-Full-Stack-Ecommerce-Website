import { Router } from "express";
import { profile } from "../controllers/profile/profile.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router  = Router();

router.get("/profile", authenticateToken, profile);

export default router;