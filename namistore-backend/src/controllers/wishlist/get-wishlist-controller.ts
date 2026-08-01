



import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { getWishlist }
from "../../services/wishlist/get-wishlist-service";

export async function getWishlistController(
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

        const wishlist =
            await getWishlist(userId);

        return res.status(200).json({
            success: true,
            wishlist
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