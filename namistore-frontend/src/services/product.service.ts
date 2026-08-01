import { apiFetch } from "./api.service";

type GetProductsOptions = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
};

export async function getProducts(
  options: GetProductsOptions = {}
) {

  const params =
    new URLSearchParams();

  if (options.page)
    params.append(
      "page",
      options.page.toString()
    );

  if (options.limit)
    params.append(
      "limit",
      options.limit.toString()
    );

  if (options.search)
    params.append(
      "search",
      options.search
    );

  if (options.categoryId)
    params.append(
      "categoryId",
      options.categoryId.toString()
    );

  if (options.minPrice)
    params.append(
      "minPrice",
      options.minPrice.toString()
    );

  if (options.maxPrice)
    params.append(
      "maxPrice",
      options.maxPrice.toString()
    );

  return apiFetch(
    `/products?${params.toString()}`
  );
}

export async function getProduct(
    id: number
) {

    return apiFetch(

        `/products/${id}`

    );

}