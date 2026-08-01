"use client";

import { useState } from "react";

import { createCategory }
from "@/admin/services/admin.category.service";

import "@/styles/CreateCategoryPage.css";

export default function CreateCategoryPage() {

    const [name, setName] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            setMessage("");

            await createCategory(name);

            setMessage(
                "Category created successfully."
            );

            setName("");

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

        <div className="create-category-page">

            <div className="create-category-card">

                <h1>Create Category</h1>

                {message &&
                    <p>{message}</p>
                }

                {error &&
                    <p>{error}</p>
                }

                <form
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Category Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter category name"

                            value={name}

                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }

                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Creating..."
                                : "Create Category"
                        }

                    </button>

                </form>

            </div>

        </div>
    );
}