

"use client";

import { useEffect, useState } from "react";

import {
    getCart,
    updateCartItem,
    removeCartItem
} from "@/services/cart.service";

import { Cart } from "@/types/cart.types";

import "@/styles/CartPage.css";

export default function CartPage() {

    const [cart, setCart] =
        useState<Cart | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


        async function loadCart() {

    try {

        const data =
            await getCart();

        setCart(
            data.cart
        );

    }
    catch (error) {

        setError(

            error instanceof Error

                ? error.message

                : "Failed to load cart"

        );

    }
    finally {

        setLoading(false);

    }

}

useEffect(() => {

    loadCart();

}, []);

async function increaseQuantity(

    cartItemId: number,

    quantity: number

) {

    try {

        await updateCartItem(

            cartItemId,

            quantity + 1

        );

        loadCart();

    }
    catch (error) {

        alert(

            error instanceof Error

                ? error.message

                : "Something went wrong"

        );

    }

}

async function decreaseQuantity(

    cartItemId: number,

    quantity: number

) {

    if (quantity <= 1) {

        return;

    }

    try {

        await updateCartItem(

            cartItemId,

            quantity - 1

        );

        loadCart();

    }
    catch (error) {

        alert(

            error instanceof Error

                ? error.message

                : "Something went wrong"

        );

    }

}

async function deleteItem(

    cartItemId: number

) {

    try {

        await removeCartItem(

            cartItemId

        );

        loadCart();

    }
    catch (error) {

        alert(

            error instanceof Error

                ? error.message

                : "Something went wrong"

        );

    }

}

if (loading) {

    return <h2>Loading...</h2>;

}

if (error) {

    return <h2>{error}</h2>;

}

if (

    !cart ||

    cart.items.length === 0

) {

    return (

        <h2>

            Your cart is empty.

        </h2>

    );

}


if (
    !cart ||
    cart.items.length === 0
) {

    return (
        <h2>
            Your cart is empty.
        </h2>
    );

}

const total = cart.items.reduce(

    (sum, item) =>

        sum +

        Number(item.product.price) *

        item.quantity,

    0

);

return (

<div className="cart-page">

<h1>

Shopping Cart

</h1>

<div className="cart-items">

{

cart.items.map(item => (

<div

key={item.id}

className="cart-item"

>

<img

src={`${process.env.NEXT_PUBLIC_API_URL}${item.product.imageUrl}`}

alt={item.product.name}

className="cart-image"

/>

<div className="cart-info">

<h2>

{item.product.name}

</h2>

<p>

₹

{Number(item.product.price).toLocaleString()}

</p>

<div className="quantity-controls">

<button

onClick={() =>

decreaseQuantity(

item.id,

item.quantity

)

}

>

-

</button>

<span>

{item.quantity}

</span>

<button

onClick={() =>

increaseQuantity(

item.id,

item.quantity

)

}

>

+

</button>

</div>

<button

className="remove-button"

onClick={() =>

deleteItem(item.id)

}

>

Remove

</button>

</div>

</div>

))

}

</div>

<div className="cart-summary">

<h2>

Total

</h2>

<h1>

₹

{total.toLocaleString()}

</h1>

<button
className="checkout-button"
>

Proceed To Checkout

</button>

</div>

</div>

);

}