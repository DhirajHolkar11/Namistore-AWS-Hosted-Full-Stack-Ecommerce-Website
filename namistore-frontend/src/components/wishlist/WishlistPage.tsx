


"use client";

import { useEffect, useState } from "react";

import {

    getWishlist,

    removeFromWishlist

}

from "@/services/wishlist.service";

import {

    addToCart

}

from "@/services/cart.service";

import {

    Wishlist

}

from "@/types/wishlist.types";

import "@/styles/WishlistPage.css";

export default function WishlistPage() {

    const [wishlist, setWishlist] =

        useState<Wishlist | null>(null);

    const [loading, setLoading] =

        useState(true);

    const [error, setError] =

        useState("");


        async function loadWishlist() {

    try {

        const data =

            await getWishlist();

        setWishlist(

            data.wishlist

        );

    }

    catch (error) {

        setError(

            error instanceof Error

                ? error.message

                : "Failed to load wishlist"

        );

    }

    finally {

        setLoading(false);

    }

}

useEffect(() => {

    loadWishlist();

}, []);

async function handleRemove(

    productId: number

) {

    try {

        await removeFromWishlist(

            productId

        );

        loadWishlist();

    }

    catch (error) {

        alert(

            error instanceof Error

                ? error.message

                : "Something went wrong"

        );

    }

}

async function moveToCart(

    productId: number

) {

    try {

        await addToCart(

            productId,

            1

        );

        await removeFromWishlist(

            productId

        );

        loadWishlist();

        alert(

            "Moved to cart."

        );

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

    !wishlist ||

    wishlist.items.length === 0

) {

    return (

        <h2>

            Your wishlist is empty.

        </h2>

    );

}
if (
    !wishlist ||
    wishlist.items.length === 0
) {

    return (
        <h2>
            Your wishlist is empty.
        </h2>
    );

}
return (

<div className="wishlist-page">

<h1>

My Wishlist

</h1>

<div className="wishlist-grid">

{

wishlist.items.map(item => (

<div

key={item.id}

className="wishlist-card"

>

<img

src={`${process.env.NEXT_PUBLIC_API_URL}${item.product.imageUrl}`}

alt={item.product.name}

className="wishlist-image"

/>

<h2>

{item.product.name}

</h2>

<p>

₹

{Number(item.product.price).toLocaleString()}

</p>

<div className="wishlist-buttons">

<button

className="cart-button"

onClick={() =>

moveToCart(

item.product.id

)

}

>

Move To Cart

</button>

<button

className="remove-button"

onClick={() =>

handleRemove(

item.product.id

)

}

>

Remove

</button>

</div>

</div>

))

}

</div>

</div>

);

}