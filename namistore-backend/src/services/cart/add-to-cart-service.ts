import prisma from "../../config/prisma";

type AddToCartInput = {
    userId: number;
    productId: number;
    quantity: number;
};

export async function addToCart(
    data: AddToCartInput
) {

    const product =
        await prisma.product.findUnique({
            where: {
                id: data.productId
            }
        });

    if (!product || !product.isActive) {
        throw new Error(
            "Product not found"
        );
    }

    let cart =
        await prisma.cart.findUnique({
            where: {
                userId: data.userId
            }
        });

    if (!cart) {

        cart =
            await prisma.cart.create({
                data: {
                    userId: data.userId
                }
            });
    }

    const existingCartItem =
        await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: data.productId
            }
        });

    if (existingCartItem) {

        return await prisma.cartItem.update({
            where: {
                id: existingCartItem.id
            },
            data: {
                quantity:
                    existingCartItem.quantity +
                    data.quantity
            }
        });
    }

    return await prisma.cartItem.create({
        data: {
            cartId: cart.id,
            productId: data.productId,
            quantity: data.quantity
        }
    });
}