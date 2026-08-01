import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { createReview }
from "../../services/reviews/create-review-service";

export async function createReviewController(
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
            Number(req.params.id);

        const {
            rating,
            comment
        } = req.body;

        const review =
            await createReview({
                userId,
                productId,
                rating,
                comment
            });

        return res.status(201).json({
            success: true,
            review
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