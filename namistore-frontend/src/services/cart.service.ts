import { apiFetch } from "./api.service";

export async function addToCart(
    productId: number,
    quantity: number
) {

    return apiFetch(

        "/cart",

        {

            method: "POST",

            body: JSON.stringify({

                productId,

                quantity

            })

        }

    );

}

export async function getCart() {

    return apiFetch(

        "/cart"

    );

}

export async function updateCartItem(
    cartItemId: number,
    quantity: number
) {

    return apiFetch(

        `/cart/items/${cartItemId}`,

        {

            method: "PUT",

            body: JSON.stringify({

                quantity

            })

        }

    );

}

export async function removeCartItem(
    cartItemId: number
) {

    return apiFetch(

        `/cart/items/${cartItemId}`,

        {

            method: "DELETE"

        }

    );

}