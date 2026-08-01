import prisma from "../../config/prisma";

export async function getOrders(
    userId: number
) {

    const orders =
        await prisma.order.findMany({
            where: {
                userId
            },

            // include: {
            //     items: true
            // },

            include: {

                items: {

                    include: {

                        product: {

                            select: {

                                id: true,

                                name: true,

                                imageUrl: true,

                                price: true

                            }

                        }

                    }

                }

            },

            orderBy: {
                createdAt: "desc"
            }
        });

    return orders;
}