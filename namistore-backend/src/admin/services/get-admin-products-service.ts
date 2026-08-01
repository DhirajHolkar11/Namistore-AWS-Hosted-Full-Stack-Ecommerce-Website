import prisma from "../../config/prisma";

export async function getAdminProducts() {

    const products =
        await prisma.product.findMany({

            include: {

                category: {

                    select: {

                        id: true,
                        name: true

                    }

                }

            },

            orderBy: {

                createdAt: "desc"

            }

        });

    return products;

}