import { Router } from "express";

import {
    authenticateToken
}
from "../middleware/auth.middleware";

import {
    createAddressController
}
from "../controllers/address/create-address-controller";

const router = Router();

router.post(
    "/addresses",
    authenticateToken,
    createAddressController
);

export default router;