import prisma from "../../config/prisma";

export async function getCart(
    userId: number
) {

    const cart =
        await prisma.cart.findUnique({
            where: {
                userId
            },

            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                category: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

    if (!cart) {
        return {
            items: []
        };
    }

    return cart;
}