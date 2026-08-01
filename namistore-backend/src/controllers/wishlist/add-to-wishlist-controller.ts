import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { addToWishlist }
from "../../services/wishlist/add-to-wishlist-service";

export async function addToWishlistController(
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

        const { productId } =
            req.body;

        const item =
            await addToWishlist({
                userId,
                productId
            });

        return res.status(201).json({
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