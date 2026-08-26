"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {

    getProducts

} from "@/services/product.service";

import {

    Product

} from "@/types/product.types";

import ProductCard from "@/components/product-card/ProductCard";

import SectionHeader from "@/components/common/SectionHeader";

import "@/styles/LatestProducts.css";

import { getImageUrl } from "@/utils/image-url";

export default function LatestProducts() {

    const [

        products,

        setProducts

    ] =

        useState<Product[]>([]);

    const [

        loading,

        setLoading

    ] =

        useState(true);

    useEffect(() => {

        async function loadProducts() {

            try {

                const data =

                    await getProducts({

                        page: 1,

                        limit: 8

                    });

                setProducts(

                    data.products

                );

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        }

        loadProducts();

    }, []);

        if (loading) {

        return null;

    }

    return (

        <section className="latest-products">

            <SectionHeader

                title="Latest Products"

                subtitle="Discover the newest products in our store."

            />

            <div className="latest-products-grid">

                {

                    products.map(

                        (product) => (

                            <ProductCard

                                key={product.id}

                                id={product.id}

                                name={product.name}

                                price={Number(product.price)}

                                // image={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
                                image={getImageUrl(product.imageUrl)}

                            />

                        )

                    )

                }

            </div>

            <div className="view-all-products">

                <Link href="/products">

                    View All Products →

                </Link>

            </div>

        </section>

    );

}