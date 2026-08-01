"use client";

import { useEffect, useState } from "react";

import { getProducts }
  from "@/services/product.service";

import { Product }
  from "@/types/product.types";






import ProductCard from "@/components/product-card/ProductCard";


import {

  getCategories

} from "@/services/category.service";

import {

  Category

} from "@/types/category.types";


import "@/styles/ProductsPage.css";

export default function ProductsPage() {




  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [categories, setCategories] =

    useState<Category[]>([]);

  const [

    selectedCategory,

    setSelectedCategory

  ] =

    useState<number>();


  const [minPrice, setMinPrice] =

    useState("");

  const [maxPrice, setMaxPrice] =

    useState("");



  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);





  useEffect(() => {

    async function loadProducts() {

      try {

        const data =






          await getProducts({

            page,

            limit: 8,

            search,

            categoryId:
              selectedCategory,

            minPrice:
              minPrice
                ? Number(minPrice)
                : undefined,

            maxPrice:
              maxPrice
                ? Number(maxPrice)
                : undefined

          });

        setProducts(
          data.products
        );


        setTotalPages(
          data.totalPages
        );
        const categoryData =

          await getCategories();

        setCategories(

          categoryData.categories

        );

      }
      catch (error) {

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load products"
        );
      }
      finally {

        setLoading(false);
      }
    }

    loadProducts();

  }, [page, search, selectedCategory, minPrice, maxPrice]);


  useEffect(() => {

    setPage(1);

  }, [

    search,

    selectedCategory,

    minPrice,

    maxPrice

  ]);



  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }





  return (
    <div className="products-page">

      <h1>All Products</h1>
      <div className="search-box">

        <input

          type="text"

          placeholder="Search products..."

          value={search}

          onChange={(e) =>

            setSearch(

              e.target.value

            )

          }

        />

      </div>

      <div className="products-layout">

        <aside className="filters">

          <h3>Filters</h3>

          <div className="price-filter">

            <input

              type="number"

              placeholder="Min Price"

              value={minPrice}

              onChange={(e) =>

                setMinPrice(

                  e.target.value

                )

              }

            />

            <input

              type="number"

              placeholder="Max Price"

              value={maxPrice}

              onChange={(e) =>

                setMaxPrice(

                  e.target.value

                )

              }

            />

          </div>



          <div className="filter-group">

            {

              categories.map(

                (category) => (

                  <label

                    key={category.id}

                  >

                    <input

                      type="radio"

                      checked={

                        selectedCategory ===

                        category.id

                      }

                      onChange={() =>

                        setSelectedCategory(

                          category.id

                        )

                      }

                    />

                    {category.name}

                  </label>

                )

              )

            }

            <button

              className="clear-filter"

              onClick={() =>

                setSelectedCategory(

                  undefined

                )

              }

            >

              Clear Filter

            </button>

          </div>

        </aside>

        <section className="products-content">

          <div className="products-grid">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={Number(product.price)}
                image={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
              />
            ))}

          </div>




          <div className="pagination">

            <button

              disabled={page === 1}

              onClick={() =>

                setPage(page - 1)

              }

            >

              Previous

            </button>

            <span>

              Page {page} of {totalPages}

            </span>

            <button

              disabled={

                page === totalPages

              }

              onClick={() =>

                setPage(page + 1)

              }

            >

              Next

            </button>

          </div>

        </section>

      </div>

    </div>
  );
}




