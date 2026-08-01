import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { getOrders }
from "../../services/orders/get-orders-service";

export async function getOrdersController(
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

        const orders =
            await getOrders(userId);

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
        });
    }
}