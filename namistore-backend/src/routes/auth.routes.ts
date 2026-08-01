
import{register} from "../controllers/authentication/auth.controller.register";
import { login } from "../controllers/authentication/auth.controller.login";

import {Router} from "express";

const router = Router();

router.post("/register",register);
router.post("/login",login);

export default router;







