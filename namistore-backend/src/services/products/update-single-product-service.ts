



// import prisma from "../../config/prisma";

// type UpdateProductInput = {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     stock: number;
//     imageUrl?: string;
//     categoryId: number;
// };

// export async function updateProduct(
//     data: UpdateProductInput
// ) {

//     const existingProduct =
//         await prisma.product.findUnique({

//             where: {
//                 id: data.id
//             }

//         });

//     if (!existingProduct) {

//         throw new Error(
//             "Product not found"
//         );

//     }

//     const category =
//         await prisma.category.findUnique({

//             where: {
//                 id: data.categoryId
//             }

//         });

//     if (!category) {

//         throw new Error(
//             "Category not found"
//         );

//     }

//     return await prisma.product.update({

//         where: {
//             id: data.id
//         },

//         data: {

//             name:
//                 data.name.trim(),

//             description:
//                 data.description.trim(),

//             price:
//                 data.price,

//             stock:
//                 data.stock,

//             imageUrl:
//                 data.imageUrl
//                     ? data.imageUrl
//                     : existingProduct.imageUrl,

//             categoryId:
//                 data.categoryId

//         }

//     });

// }




import prisma from "../../config/prisma";

import {
    deleteImageFromS3
} from "../s3/delete-image";


type UpdateProductInput = {

    id: number;

    name: string;

    description: string;

    price: number;

    stock: number;

    imageUrl?: string;

    categoryId: number;

};


export async function updateProduct(
    data: UpdateProductInput
) {

    /*
     * Find the existing product
     */

    const existingProduct =
        await prisma.product.findUnique({

            where: {

                id: data.id

            }

        });


    if (!existingProduct) {

        throw new Error(
            "Product not found"
        );

    }


    /*
     * Check that the new category exists
     */

    const category =
        await prisma.category.findUnique({

            where: {

                id: data.categoryId

            }

        });


    if (!category) {

        throw new Error(
            "Category not found"
        );

    }


    /*
     * If a new image was uploaded,
     * delete the old image from S3.
     */

    if (
        data.imageUrl &&
        existingProduct.imageUrl
    ) {

        /*
         * Only try to delete the image
         * if it is an S3 URL.
         */

        if (
            existingProduct.imageUrl.startsWith(
                "https://"
            )
        ) {

            await deleteImageFromS3(
                existingProduct.imageUrl
            );

        }

    }


    /*
     * Update the product in PostgreSQL
     */

    const product =
        await prisma.product.update({

            where: {

                id: data.id

            },

            data: {

                name:
                    data.name.trim(),

                description:
                    data.description.trim(),

                price:
                    data.price,

                stock:
                    data.stock,

                imageUrl:
                    data.imageUrl
                        ? data.imageUrl
                        : existingProduct.imageUrl,

                categoryId:
                    data.categoryId

            }

        });


    return product;

}