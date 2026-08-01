import { Router } from "express";

import {
    authenticateToken
}
from "../middleware/auth.middleware";

import {
    createOrderController
}
from "../controllers/orders/create-order-controller";

import { getOrdersController } from "../controllers/orders/get-orders-controller";

import { getOrderController } from "../controllers/orders/get-order-controller";

import { updateOrderStatusController } from "../controllers/orders/update-order-status-controller";

import { authorizeAdmin } from "../admin/middleware/admin.middleware";

const router = Router();

router.post(
    "/orders",
    authenticateToken,
    createOrderController
);

router.get("/orders", authenticateToken,getOrdersController);

router.get("/orders/:id", authenticateToken, getOrderController);

router.patch("/orders/:id/status",authenticateToken,authorizeAdmin,updateOrderStatusController);

export default router;