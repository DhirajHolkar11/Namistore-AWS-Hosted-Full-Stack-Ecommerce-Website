import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { deleteReview }
from "../../services/reviews/remove-review-service";

export async function deleteReviewController(
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

        await deleteReview({
            reviewId,
            userId
        });

        return res.status(200).json({
            success: true,
            message:
                "Review deleted successfully"
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