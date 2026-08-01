"use client";

import { useEffect, useState } from "react";

import {
    createProduct,
    getCategories
}
    from "@/admin/services/admin.product.service";

import "@/styles/CreateProductPage.css";

type Category = {
    id: number;
    name: string;
};

export default function CreateProductPage() {

    const [categories, setCategories] =
        useState<Category[]>([]);

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [stock, setStock] =
        useState("");



    const [image, setImage] =
        useState<File | null>(null);

    const [categoryId, setCategoryId] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    useEffect(() => {

        async function loadCategories() {

            try {

                const data =
                    await getCategories();

                setCategories(
                    data.categories
                );

            }
            catch {

                setError(
                    "Failed to load categories."
                );

            }
        }

        loadCategories();

    }, []);







    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            setMessage("");

            if (!image) {

                throw new Error(
                    "Please select an image."
                );

            }

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

            formData.append(
                "image",
                image
            );

            await createProduct(
                formData
            );

            setMessage(
                "Product created successfully."
            );

            setName("");
            setDescription("");
            setPrice("");
            setStock("");
            setCategoryId("");
            setImage(null);

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





    return (

        <div className="create-product-page">

            <div className="create-product-card">

                <h1>Create Product</h1>

                {message && <p>{message}</p>}

                {error && <p>{error}</p>}

                <form onSubmit={handleSubmit}>



                    <div className="form-group">

                        <label>Name</label>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />

                    </div>












                    <div className="form-group">

                        <label>Description</label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Price</label>

                        <input
                            type="number"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Stock</label>

                        <input
                            type="number"
                            value={stock}
                            onChange={(e) =>
                                setStock(e.target.value)
                            }
                            required
                        />

                    </div>







                    <div className="form-group">

                        <label>Product Image</label>

                        <input
                            type="file"
                            accept="image/*"

                            onChange={(e) => {

                                if (e.target.files) {

                                    setImage(
                                        e.target.files[0]
                                    );

                                }

                            }}

                            required
                        />





                        {
                            image && (

                                <p>

                                    Selected:

                                    {" "}

                                    {image.name}

                                </p>

                            )
                        }






                    </div>




                    <div className="form-group">

                        <label>Category</label>

                        <select
                            value={categoryId}
                            onChange={(e) =>
                                setCategoryId(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Select Category
                            </option>

                            {
                                categories.map(category => (

                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>

                                ))
                            }

                        </select>

                    </div>

                    <button
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Creating..."
                                : "Create Product"
                        }

                    </button>

                </form>

            </div>

        </div>

    );
}