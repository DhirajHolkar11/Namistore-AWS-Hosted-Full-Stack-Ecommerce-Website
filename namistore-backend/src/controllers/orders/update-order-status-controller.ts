import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { OrderStatus }
from "../../generated/prisma";

import { updateOrderStatus }
from "../../services/orders/update-order-status-service";

export async function updateOrderStatusController(
    req: AuthRequest,
    res: Response
) {

    try {

        const orderId =
            Number(req.params.id);

        if (isNaN(orderId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid order id"
            });
        }

        const { status } = req.body;

        const validStatuses =
            Object.values(OrderStatus);

        if (
            !validStatuses.includes(
                status
            )
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const order =
            await updateOrderStatus({
                orderId,
                status
            });

        return res.status(200).json({
            success: true,
            order
        });

    }
    catch (error) {

        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
        });
    }
}