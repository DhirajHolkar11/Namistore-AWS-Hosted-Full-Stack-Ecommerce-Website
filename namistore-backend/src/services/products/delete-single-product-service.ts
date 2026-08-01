import prisma from "../../config/prisma";

export async function deleteProduct(
    id: number
) {

    const product =
        await prisma.product.findUnique({
            where: {
                id
            }
        });

    if (!product) {
        throw new Error(
            "Product not found"
        );
    }

    const updatedProduct =
        await prisma.product.update({
            where: {
                id
            },

            data: {
                isActive: false
            }
        });

    return updatedProduct;
}