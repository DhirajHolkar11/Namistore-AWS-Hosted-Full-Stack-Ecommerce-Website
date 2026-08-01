import prisma from "../../config/prisma";

export async function getSingleProduct(
    id: number
) {

    const product =
        await prisma.product.findUnique({

            where: {
                id
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