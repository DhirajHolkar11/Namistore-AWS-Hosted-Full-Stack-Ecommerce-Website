import prisma from "../../config/prisma";

export async function activateProduct(
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

    return await prisma.product.update({

        where: {
            id
        },

        data: {
            isActive: true
        }

    });

}