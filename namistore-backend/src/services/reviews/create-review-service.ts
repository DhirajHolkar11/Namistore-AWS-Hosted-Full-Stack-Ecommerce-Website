import prisma from "../../config/prisma";

type CreateReviewInput = {
    userId: number;
    productId: number;
    rating: number;
    comment: string;
};

export async function createReview(
    data: CreateReviewInput
) {

    const product =
        await prisma.product.findUnique({
            where: {
                id: data.productId
            }
        });

    if (!product) {
        throw new Error(
            "Product not found"
        );
    }

    const existingReview =
        await prisma.review.findUnique({
            where: {
                userId_productId: {
                    userId: data.userId,
                    productId: data.productId
                }
            }
        });

    if (existingReview) {
        throw new Error(
            "You already reviewed this product"
        );
    }

    return await prisma.review.create({
        data: {
            userId: data.userId,
            productId: data.productId,
            rating: data.rating,
            comment: data.comment
        }
    });
}