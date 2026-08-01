import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { removeCartItem }
from "../../services/cart/remove-cart-item-service";

export async function removeCartItemController(
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

        const cartItemId =
            Number(req.params.id);

        if (
            isNaN(cartItemId)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid cart item id"
            });
        }

        await removeCartItem({
            userId,
            cartItemId
        });

        return res.status(200).json({
            success: true,
            message:
                "Cart item removed successfully"
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