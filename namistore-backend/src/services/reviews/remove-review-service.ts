import prisma from "../../config/prisma";

type DeleteReviewInput = {
    reviewId: number;
    userId: number;
};

export async function deleteReview(
    data: DeleteReviewInput
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

    await prisma.review.delete({
        where: {
            id: data.reviewId
        }
    });

    return true;
}