import prisma from "../../config/prisma";

export async function getWishlist(
    userId: number
) {

    const wishlist =
        await prisma.wishlist.findUnique({
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

    if (!wishlist) {

        return {
            items: []
        };
    }

    return wishlist;
}

