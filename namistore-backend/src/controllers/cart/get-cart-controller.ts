import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { getCart }
from "../../services/cart/get-cart-service";

export async function getCartController(
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

        const cart =
            await getCart(userId);

        return res.status(200).json({
            success: true,
            cart
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