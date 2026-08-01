import prisma from "../../config/prisma";

export async function getOrder(
    userId: number,
    orderId: number
) {

    const order =
        await prisma.order.findFirst({
            where: {
                id: orderId,
                userId
            },

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
            }
        });

    if (!order) {
        throw new Error(
            "Order not found"
        );
    }

    return order;
}