import prisma from "../../config/prisma";

type RemoveCartItemInput = {
    userId: number;
    cartItemId: number;
};

export async function removeCartItem(
    data: RemoveCartItemInput
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

    await prisma.cartItem.delete({
        where: {
            id: data.cartItemId
        }
    });

    return true;
}