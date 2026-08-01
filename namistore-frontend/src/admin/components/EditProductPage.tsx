"use client";

import { useEffect, useState } from "react";

import { useRouter, useParams }
    from "next/navigation";

import {

    getAdminProduct,

    updateProduct

}
    from "@/admin/services/admin.product.service";


import { getCategories } from "@/admin/services/admin.product.service";


import "@/styles/EditProductPage.css";

export default function EditProductPage() {

    const router =
        useRouter();

    const params =
        useParams();

    const id =
        Number(params.id);

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [stock, setStock] =
        useState("");

    const [categoryId, setCategoryId] =
        useState("");

    const [image, setImage] =
        useState<File | null>(null);

    const [currentImage, setCurrentImage] =
        useState("");

    const [categories, setCategories] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        async function loadData() {

            try {

                const productData =
                    await getAdminProduct(id);

                const categoryData =
                    await getCategories();

                const product =
                    productData.product;

                setName(
                    product.name
                );

                setDescription(
                    product.description
                );

                setPrice(
                    product.price
                );

                setStock(
                    product.stock
                );

                setCategoryId(
                    String(product.categoryId)
                );

                setCurrentImage(
                    product.imageUrl
                );

                setCategories(
                    categoryData.categories
                );

            }
            catch (error) {

                alert(
                    "Failed to load product"
                );

            }
            finally {

                setLoading(false);

            }

        }

        loadData();

    }, [id]);

    async function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault();

        try {

            const formData =
                new FormData();

            formData.append(
                "name",
                name
            );

            formData.append(
                "description",
                description
            );

            formData.append(
                "price",
                price
            );

            formData.append(
                "stock",
                stock
            );

            formData.append(
                "categoryId",
                categoryId
            );

            if (image) {

                formData.append(
                    "image",
                    image
                );

            }

            await updateProduct(
                id,
                formData
            );

            alert(
                "Product updated successfully"
            );

            router.push(
                "/admin/products"
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

    return (

        <div className="edit-product-page">

            <div className="edit-product-card">

                <h1>Edit Product</h1>

                <form
                    onSubmit={handleSubmit}
                    className="edit-product-form"
                >

                    <div className="form-group">

                        <label>
                            Name
                        </label>

                        <input

                            type="text"

                            value={name}

                            onChange={(e) =>
                                setName(e.target.value)
                            }

                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea

                            value={description}

                            onChange={(e) =>
                                setDescription(e.target.value)
                            }

                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Price
                        </label>

                        <input

                            type="number"

                            value={price}

                            onChange={(e) =>
                                setPrice(e.target.value)
                            }

                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Stock
                        </label>

                        <input

                            type="number"

                            value={stock}

                            onChange={(e) =>
                                setStock(e.target.value)
                            }

                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <select

                            value={categoryId}

                            onChange={(e) =>
                                setCategoryId(e.target.value)
                            }

                        >

                            {categories.map(category => (

                                <option

                                    key={category.id}

                                    value={category.id}

                                >

                                    {category.name}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Current Image

                        </label>

                        <img

                            src={`http://localhost:5000${currentImage}`}

                            alt={name}

                            className="current-image"

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Choose New Image

                        </label>

                        <input

                            type="file"

                            accept="image/*"

                            onChange={(e) =>

                                setImage(

                                    e.target.files
                                        ? e.target.files[0]
                                        : null

                                )

                            }

                        />

                    </div>

                    <button
                        type="submit"
                    >

                        Update Product

                    </button>

                </form>

            </div>

        </div>

    );
}