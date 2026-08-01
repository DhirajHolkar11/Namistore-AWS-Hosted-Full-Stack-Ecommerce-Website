import prisma from "../../config/prisma";

export async function getProductReviews(
    productId: number
) {

    const product =
        await prisma.product.findUnique({
            where: {
                id: productId
            }
        });

    if (!product) {
        throw new Error(
            "Product not found"
        );
    }

    const reviews =
        await prisma.review.findMany({
            where: {
                productId
            },

            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                }
            },

            orderBy: {
                createdAt: "desc"
            }
        });

    const totalReviews =
        reviews.length;

    const averageRating =
        totalReviews === 0
            ? 0
            : reviews.reduce(
                (sum, review) =>
                    sum + review.rating,
                0
            ) / totalReviews;

    return {
        averageRating:
            Number(
                averageRating.toFixed(1)
            ),
        totalReviews,
        reviews
    };
}