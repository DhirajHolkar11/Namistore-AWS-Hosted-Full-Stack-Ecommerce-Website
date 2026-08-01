// import { Request, Response } from "express";

// import { createProduct }
// from "../../services/products/create-single-product-service";

// export async function createProductController(
//     req: Request,
//     res: Response
// ) {

//     try {

//         const {
//             name,
//             description,
//             price,
//             stock,
//             imageUrl,
//             categoryId
//         } = req.body;

//         if (
//             !name ||
//             !description ||
//             price === undefined ||
//             stock === undefined ||
//             !imageUrl ||
//             !categoryId
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             });
//         }

//         const product =
//             await createProduct({
//                 name,
//                 description,
//                 price: Number(price),
//                 stock: Number(stock),
//                 imageUrl,
//                 categoryId: Number(categoryId)
//             });

//         return res.status(201).json({
//             success: true,
//             product
//         });

//     }
//     catch (error) {

//         return res.status(400).json({
//             success: false,
//             message:
//                 error instanceof Error
//                     ? error.message
//                     : "Something went wrong"
//         });
//     }
// }












import { Request, Response } from "express";

import { createProduct }
from "../../services/products/create-single-product-service";

export async function createProductController(
    req: Request,
    res: Response
) {

    try {

        const {
            name,
            description,
            price,
            stock,
            categoryId
        } = req.body;

        if (
            !name ||
            !description ||
            price === undefined ||
            stock === undefined ||
            !categoryId
        ) {

            return res.status(400).json({

                success: false,

                message: "All fields are required"

            });

        }

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Product image is required"

            });

        }

        const imageUrl =
            `/uploads/products/${req.file.filename}`;

        const product =
            await createProduct({

                name,

                description,

                price: Number(price),

                stock: Number(stock),

                imageUrl,

                categoryId: Number(categoryId)

            });

        return res.status(201).json({

            success: true,

            product

        });

    }
    catch (error) {

        return res.status(400).json({

            success: false,

            message:

                error instanceof Error
                    ? error.message
                    : "Something went wrong"

        });

    }

}