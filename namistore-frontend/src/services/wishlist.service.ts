import { apiFetch } from "./api.service";

export async function addToWishlist(
    productId: number
) {

    return apiFetch(

        "/wishlist",

        {

            method: "POST",

            body: JSON.stringify({

                productId

            })

        }

    );

}

export async function getWishlist() {

    return apiFetch(

        "/wishlist"

    );

}

export async function removeFromWishlist(
    productId: number
) {

    return apiFetch(

        `/wishlist/${productId}`,

        {

            method: "DELETE"

        }

    );

}