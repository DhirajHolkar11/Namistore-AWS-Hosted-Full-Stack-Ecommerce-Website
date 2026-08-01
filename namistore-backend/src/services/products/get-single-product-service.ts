import prisma from "../../config/prisma";

export async function getProduct(
    id: number
) {

    const product =
        await prisma.product.findFirst({
            where: {
                id,
                isActive: true
            },

            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

    if (!product) {
        throw new Error(
            "Product not found"
        );
    }

    return product;
}