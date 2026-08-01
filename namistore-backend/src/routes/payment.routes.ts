import { Router } from "express";

import {
    authenticateToken
}
from "../middleware/auth.middleware";

import {
    createPaymentOrderController
}
from "../controllers/payments/create-payment-order-controller";


import { verifyPaymentController } from "../controllers/payments/verify-payment-controller";

const router = Router();

router.post(
    "/payments/create-order",
    authenticateToken,
    createPaymentOrderController
);

router.post("payments/verify",verifyPaymentController);

export default router;