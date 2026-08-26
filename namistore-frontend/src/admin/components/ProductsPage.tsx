

"use client";

import { useEffect, useState } from "react";


import Link from "next/link";

import { getAdminProducts}
from "@/admin/services/admin.get.products.service";

import { deleteProduct,activateProduct } from "@/admin/services/admin.product.service";

import "@/admin/styles/AdminProductsPage.css";

type Product = {

    id: number;

    name: string;

    price: string;

    stock: number;

    isActive: boolean;

    category: {

        name: string;

    };

};

export default function ProductsPage() {

    const [products, setProducts] =
        useState<Product[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        async function loadProducts() {

            try {

                const data =
                    await getAdminProducts();

                setProducts(
                    data.products
                );

            }
            catch (error) {

                setError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong"
                );

            }
            finally {

                setLoading(false);

            }

        }

        loadProducts();

    }, []);



    async function handleDelete(
    id: number
) {

    const confirmed =
        window.confirm(
            "Are you sure you want to deactivate this product?"
        );

    if (!confirmed) {

        return;

    }

    try {

        await deleteProduct(id);

        setProducts(

            products.map(product =>

                product.id === id

                    ? {
                        ...product,
                        isActive: false
                    }

                    : product

            )

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






    async function handleActivate(
    id: number
) {

    try {

        await activateProduct(id);

        setProducts(

            products.map(product =>

                product.id === id

                    ? {

                        ...product,

                        isActive: true

                    }

                    : product

            )

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


    if (loading)
        return <h2>Loading...</h2>;

    if (error)
        return <h2>{error}</h2>;

    return (

        <div className="admin-products-page">

            <h1>All Products</h1>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        products.map(product => (

                            <tr key={product.id}>

                                <td>{product.id}</td>

                                <td>{product.name}</td>

                                <td>{product.category.name}</td>

                                <td>₹ {product.price}</td>

                                <td>{product.stock}</td>

                                <td>

                                    {

                                        product.isActive

                                            ? "Active"

                                            : "Inactive"

                                    }

                                </td>

                                

                                <td>

    {/* <button>
        Edit
    </button> */}

    <Link
    href={`/admin/products/${product.id}/edit`}
>

    <button>

        Edit

    </button>

</Link>

    {

        product.isActive ? (

            <button
                onClick={() =>
                    handleDelete(product.id)
                }
            >
                Deactivate
            </button>

        ) : (

            <button
                onClick={() =>
                    handleActivate(product.id)
                }
            >
                Activate
            </button>

        )

    }

</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}