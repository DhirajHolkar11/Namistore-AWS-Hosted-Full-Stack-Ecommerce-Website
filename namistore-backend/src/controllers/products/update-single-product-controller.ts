



// import { Request, Response } from "express";

// import {
//     updateProduct
// }
// from "../../services/products/update-single-product-service";

// export async function updateProductController(
//     req: Request,
//     res: Response
// ) {

//     try {

//         const id =
//             Number(req.params.id);

//         if (isNaN(id)) {

//             return res.status(400).json({

//                 success: false,

//                 message: "Invalid product id"

//             });

//         }

//         const {

//             name,

//             description,

//             price,

//             stock,

//             categoryId

//         } = req.body;

//         if (

//             !name ||

//             !description ||

//             price === undefined ||

//             stock === undefined ||

//             !categoryId

//         ) {

//             return res.status(400).json({

//                 success: false,

//                 message: "All fields are required"

//             });

//         }

//         let imageUrl: string | undefined;

//         if (req.file) {

//             imageUrl =
//                 `/uploads/products/${req.file.filename}`;

//         }

//         const product =
//             await updateProduct({

//                 id,

//                 name,

//                 description,

//                 price: Number(price),

//                 stock: Number(stock),

//                 imageUrl,

//                 categoryId:
//                     Number(categoryId)

//             });

//         return res.status(200).json({

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

import {
    updateProduct
} from "../../services/products/update-single-product-service";

import {
    uploadImageToS3
} from "../../services/s3/upload-image";


export async function updateProductController(
    req: Request,
    res: Response
) {

    try {

        const id =
            Number(req.params.id);


        if (isNaN(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid product id"

            });

        }


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


        let imageUrl: string | undefined;


        /*
         * If the admin selected a new image,
         * upload it to S3.
         */

        if (req.file) {

            imageUrl =
                await uploadImageToS3(
                    req.file
                );

        }


        const product =
            await updateProduct({

                id,

                name,

                description,

                price:
                    Number(price),

                stock:
                    Number(stock),

                imageUrl,

                categoryId:
                    Number(categoryId)

            });


        return res.status(200).json({

            success: true,

            product

        });

    }
    catch (error) {

        console.error(
            "Update product error:",
            error
        );


        return res.status(400).json({

            success: false,

            message:

                error instanceof Error

                    ? error.message

                    : "Something went wrong"

        });

    }

}


