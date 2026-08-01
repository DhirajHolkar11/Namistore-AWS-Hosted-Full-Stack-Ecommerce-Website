import prisma from "../../config/prisma";

type UpdateCartItemInput = {
    userId: number;
    cartItemId: number;
    quantity: number;
};

export async function updateCartItem(
    data: UpdateCartItemInput
) {

    const cartItem =
        await prisma.cartItem.findUnique({
            where: {
                id: data.cartItemId
            },
            include: {
                cart: true
            }
        });

    if (!cartItem) {
        throw new Error(
            "Cart item not found"
        );
    }

    if (
        cartItem.cart.userId !==
        data.userId
    ) {
        throw new Error(
            "Unauthorized"
        );
    }

    const updatedItem =
        await prisma.cartItem.update({
            where: {
                id: data.cartItemId
            },
            data: {
                quantity: data.quantity
            }
        });

    return updatedItem;
}