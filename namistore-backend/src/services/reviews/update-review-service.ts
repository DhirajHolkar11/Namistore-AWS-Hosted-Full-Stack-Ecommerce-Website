import prisma from "../../config/prisma";

type UpdateReviewInput = {
    reviewId: number;
    userId: number;
    rating: number;
    comment: string;
};

export async function updateReview(
    data: UpdateReviewInput
) {

    const review =
        await prisma.review.findUnique({
            where: {
                id: data.reviewId
            }
        });

    if (!review) {
        throw new Error(
            "Review not found"
        );
    }

    if (
        review.userId !==
        data.userId
    ) {
        throw new Error(
            "Unauthorized"
        );
    }

    const updatedReview =
        await prisma.review.update({
            where: {
                id: data.reviewId
            },
            data: {
                rating: data.rating,
                comment: data.comment
            }
        });

    return updatedReview;
}