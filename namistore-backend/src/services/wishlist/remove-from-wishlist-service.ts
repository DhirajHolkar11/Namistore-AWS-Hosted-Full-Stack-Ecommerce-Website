import prisma from "../../config/prisma";

type RemoveFromWishlistInput = {
    userId: number;
    productId: number;
};

export async function removeFromWishlist(
    data: RemoveFromWishlistInput
) {

    const wishlist =
        await prisma.wishlist.findUnique({
            where: {
                userId: data.userId
            }
        });

    if (!wishlist) {
        throw new Error(
            "Wishlist not found"
        );
    }

    const item =
        await prisma.wishlistItem.findUnique({
            where: {
                wishlistId_productId: {
                    wishlistId: wishlist.id,
                    productId: data.productId
                }
            }
        });

    if (!item) {
        throw new Error(
            "Product not found in wishlist"
        );
    }

    await prisma.wishlistItem.delete({
        where: {
            id: item.id
        }
    });

    return true;
}