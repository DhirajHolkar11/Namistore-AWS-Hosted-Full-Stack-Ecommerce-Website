import prisma from "../../config/prisma";

type AddToWishlistInput = {
    userId: number;
    productId: number;
};

export async function addToWishlist(
    data: AddToWishlistInput
) {

    const product =
        await prisma.product.findUnique({
            where: {
                id: data.productId
            }
        });

    if (!product) {
        throw new Error(
            "Product not found"
        );
    }

    let wishlist =
        await prisma.wishlist.findUnique({
            where: {
                userId: data.userId
            }
        });

    if (!wishlist) {

        wishlist =
            await prisma.wishlist.create({
                data: {
                    userId: data.userId
                }
            });
    }

    const existingItem =
        await prisma.wishlistItem.findUnique({
            where: {
                wishlistId_productId: {
                    wishlistId: wishlist.id,
                    productId: data.productId
                }
            }
        });

    if (existingItem) {
        throw new Error(
            "Product already in wishlist"
        );
    }

    const wishlistItem =
        await prisma.wishlistItem.create({
            data: {
                wishlistId: wishlist.id,
                productId: data.productId
            }
        });

    return wishlistItem;
}