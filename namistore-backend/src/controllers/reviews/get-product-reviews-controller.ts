import { Request, Response }
from "express";

import { getProductReviews }
from "../../services/reviews/get-product-reviews-service";

export async function getProductReviewsController(
    req: Request,
    res: Response
) {

    try {

        const productId =
            Number(req.params.id);

        if (
            isNaN(productId)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid product id"
            });
        }

        const result =
            await getProductReviews(
                productId
            );

        return res.status(200).json({
            success: true,
            ...result
        });

    }
    catch (error) {

        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
        });
    }
}