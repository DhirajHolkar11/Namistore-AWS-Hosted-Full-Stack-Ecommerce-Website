// import prisma from "../../config/prisma";

// type UpdateProductInput = {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     stock: number;
//     imageUrl: string;
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

//     const updatedProduct =
//         await prisma.product.update({
//             where: {
//                 id: data.id
//             },

//             data: {
//                 name: data.name.trim(),
//                 description: data.description.trim(),
//                 price: data.price,
//                 stock: data.stock,
//                 imageUrl: data.imageUrl.trim(),
//                 categoryId: data.categoryId
//             }
//         });

//     return updatedProduct;
// }







import prisma from "../../config/prisma";

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

    return await prisma.product.update({

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

}