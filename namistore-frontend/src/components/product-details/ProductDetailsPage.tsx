



"use client";

import { useEffect, useState } from "react";

import {

    useParams,

    useRouter

}
    from "next/navigation";

import {

    getProduct

}
    from "@/services/product.service";

import {

    Product

}
    from "@/types/product.types";

import "@/styles/ProductDetailsPage.css";

import { addToCart } from "@/services/cart.service";

import { addToWishlist } from "@/services/wishlist.service";

import { getImageUrl } from "@/utils/image-url";

export default function ProductDetailsPage() {

    const params =
        useParams();

    const router =
        useRouter();

    const id =
        Number(params.id);

    const [

        product,

        setProduct

    ] =
        useState<Product | null>(null);

    const [

        loading,

        setLoading

    ] =
        useState(true);

    const [

        quantity,

        setQuantity

    ] =
        useState(1);

    const [

        error,

        setError

    ] =
        useState("");

    useEffect(() => {

        async function loadProduct() {

            try {

                const data =
                    await getProduct(id);

                setProduct(
                    data.product
                );

            }
            catch (error) {

                setError(

                    error instanceof Error

                        ? error.message

                        : "Failed to load product"

                );

            }
            finally {

                setLoading(false);

            }

        }

        if (!isNaN(id)) {

            loadProduct();

        }

    }, [id]);


    async function handleAddToCart() {

        try {

            await addToCart(

                product!.id,

                quantity

            );

            alert(
                "Product added to cart successfully."
            );

            router.push("/cart");

        }
        catch (error) {

            alert(

                error instanceof Error

                    ? error.message

                    : "Failed to add product to cart"

            );

        }

    }


    async function handleAddToWishlist() {

        try {

            await addToWishlist(

                product!.id

            );

            alert(

                "Product added to wishlist."

            );

        }
        catch (error) {

            alert(

                error instanceof Error

                    ? error.message

                    : "Failed to add to wishlist"

            );

        }

    }



    if (loading) {

        return (

            <h2>

                Loading...

            </h2>

        );

    }

    if (error) {

        return (

            <h2>

                {error}

            </h2>

        );

    }

    if (!product) {

        return (

            <h2>

                Product not found

            </h2>

        );

    }

    return (

        <div className="product-details-page">

            <div className="product-details-card">

                <div className="product-image-section">

                    {/* <img

                        src={`http://localhost:5000${product.imageUrl}`}

                        alt={product.name}

                        className="product-image"

                    /> */}

                    <img
                        src={getImageUrl(product.imageUrl)}
                        alt={product.name}
                        className="product-image"
                    />

                </div>

                <div className="product-info-section">

                    <h1>

                        {product.name}

                    </h1>

                    <p className="category">

                        Category :

                        <b>

                            {product.category.name}

                        </b>

                    </p>

                    <p className="description">

                        {product.description}

                    </p>

                    <h2 className="price">

                        ₹

                        {Number(product.price).toLocaleString()}

                    </h2>

                    <p
                        className="stock"
                    >

                        {

                            product.stock > 0

                                ?

                                "In Stock"

                                :

                                "Out Of Stock"

                        }

                    </p>

                    <div className="quantity-section">

                        <button

                            onClick={() =>

                                setQuantity(

                                    Math.max(

                                        1,

                                        quantity - 1

                                    )

                                )

                            }

                        >

                            -

                        </button>

                        <span>

                            {quantity}

                        </span>

                        <button

                            onClick={() =>

                                setQuantity(

                                    quantity + 1

                                )

                            }

                        >

                            +

                        </button>

                    </div>






                    <div className="quantity-section">

                        <button
                            onClick={() =>
                                setQuantity(
                                    Math.max(
                                        1,
                                        quantity - 1
                                    )
                                )
                            }
                        >

                            -

                        </button>

                        <span>

                            {quantity}

                        </span>

                        <button

                            onClick={() =>
                                setQuantity(
                                    quantity + 1
                                )
                            }

                        >

                            +

                        </button>

                    </div>


                    <div className="product-actions">




                        <button
                            className="cart-button"
                            onClick={handleAddToCart}
                        >

                            Add To Cart

                        </button>



                        <button
                            className="wishlist-button"
                            onClick={handleAddToWishlist}
                        >

                            Add To Wishlist

                        </button>

                        <button
                            className="buy-button"
                            onClick={() =>

                                alert(
                                    "Buy Now will be connected after Cart integration."
                                )

                            }
                        >

                            Buy Now

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}