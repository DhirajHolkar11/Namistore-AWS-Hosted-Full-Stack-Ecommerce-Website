import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { createOrder }
from "../../services/orders/create-order-service";

export async function createOrderController(
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

        const order =
            await createOrder(
                userId
            );

        return res.status(201).json({
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