import prisma from "../../config/prisma";

type CreateProductInput = {
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    categoryId: number;
};

export async function createProduct(
    data: CreateProductInput
) {

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

    const product =
        await prisma.product.create({
            data: {
                name: data.name.trim(),
                description: data.description.trim(),
                price: data.price,
                stock: data.stock,
                imageUrl: data.imageUrl.trim(),
                categoryId: data.categoryId
            }
        });

    return product;
}