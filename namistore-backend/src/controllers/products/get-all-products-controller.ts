// import { Request, Response } from "express";

// import { getProducts }
// from "../../services/products/get-all-products-service";

// export async function getProductsController(
//     req: Request,
//     res: Response
// ) {

//     try {

//         const products =
//             await getProducts();

//         return res.status(200).json({
//             success: true,
//             count: products.length,
//             products
//         });

//     }
//     catch (error) {

//         return res.status(500).json({
//             success: false,
//             message:
//                 error instanceof Error
//                     ? error.message
//                     : "Something went wrong"
//         });
//     }
// }










import { Request, Response } from "express";

import { getProducts }
from "../../services/products/get-all-products-service";

export async function getProductsController(
    req: Request,
    res: Response
) {

    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 10;

        const search =
            req.query.search as string;

        const categoryId =
            req.query.categoryId
                ? Number(req.query.categoryId)
                : undefined;

        const minPrice =
            req.query.minPrice
                ? Number(req.query.minPrice)
                : undefined;

        const maxPrice =
            req.query.maxPrice
                ? Number(req.query.maxPrice)
                : undefined;

        const result =
            await getProducts({
                page,
                limit,
                search,
                categoryId,
                minPrice,
                maxPrice
            });

        return res.status(200).json({
            success: true,
            ...result
        });

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
        });
    }
}