import prisma from "../../config/prisma";

export async function createOrder(
    userId: number
) {

    return await prisma.$transaction(
        async (tx) => {

            const cart =
                await tx.cart.findUnique({
                    where: {
                        userId
                    },
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                });

            if (!cart) {
                throw new Error(
                    "Cart not found"
                );
            }

            if (cart.items.length === 0) {
                throw new Error(
                    "Cart is empty"
                );
            }

            let totalAmount = 0;

            for (const item of cart.items) {

                totalAmount +=
                    Number(item.product.price) *
                    item.quantity;
            }

            const order =
                await tx.order.create({
                    data: {
                        userId,
                        totalAmount,

                        items: {
                            create:
                                cart.items.map(
                                    item => ({
                                        productId:
                                            item.productId,

                                        quantity:
                                            item.quantity,

                                        price:
                                            item.product.price
                                    })
                                )
                        }
                    },

                    include: {
                        items: true
                    }
                });

            await tx.cartItem.deleteMany({
                where: {
                    cartId: cart.id
                }
            });

            return order;
        }
    );
}