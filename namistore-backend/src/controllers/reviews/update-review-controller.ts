import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { updateReview }
from "../../services/reviews/update-review-service";

export async function updateReviewController(
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

        const reviewId =
            Number(req.params.id);

        if (
            isNaN(reviewId)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid review id"
            });
        }

        const {
            rating,
            comment
        } = req.body;

        const review =
            await updateReview({
                reviewId,
                userId,
                rating,
                comment
            });

        return res.status(200).json({
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