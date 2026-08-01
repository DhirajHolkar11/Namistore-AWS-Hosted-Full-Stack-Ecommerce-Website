import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { getOrder }
from "../../services/orders/get-order-service";

export async function getOrderController(
    req: AuthRequest,
    res: Response
) {

    try {

        const userId =
            req.user?.userId;

        if (!userId) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const orderId =
            Number(req.params.id);

        if (isNaN(orderId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid order id"
            });
        }

        const order =
            await getOrder(
                userId,
                orderId
            );

        return res.status(200).json({
            success: true,
            order
        });

    }
    catch (error) {

        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
        });
    }
}