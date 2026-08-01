import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { addToCart }
from "../../services/cart/add-to-cart-service";

export async function addToCartController(
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

        const {
            productId,
            quantity
        } = req.body;

        if (
            !productId ||
            !quantity
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Product id and quantity are required"
            });
        }

        const cartItem =
            await addToCart({
                userId,
                productId: Number(productId),
                quantity: Number(quantity)
            });

        return res.status(201).json({
            success: true,
            cartItem
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