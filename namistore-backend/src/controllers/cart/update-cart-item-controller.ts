import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { updateCartItem }
from "../../services/cart/update-cart-item-service";

export async function updateCartItemController(
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

        const {
            quantity
        } = req.body;

        if (
            isNaN(cartItemId)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid cart item id"
            });
        }

        if (
            !quantity ||
            quantity < 1
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Quantity must be greater than 0"
            });
        }

        const item =
            await updateCartItem({
                userId,
                cartItemId,
                quantity: Number(quantity)
            });

        return res.status(200).json({
            success: true,
            item
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