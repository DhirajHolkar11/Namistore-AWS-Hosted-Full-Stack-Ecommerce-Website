import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { removeFromWishlist }
from "../../services/wishlist/remove-from-wishlist-service";

export async function removeFromWishlistController(
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

        const productId =
            Number(req.params.productId);

        if (isNaN(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product id"
            });
        }

        await removeFromWishlist({
            userId,
            productId
        });

        return res.status(200).json({
            success: true,
            message:
                "Product removed from wishlist"
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