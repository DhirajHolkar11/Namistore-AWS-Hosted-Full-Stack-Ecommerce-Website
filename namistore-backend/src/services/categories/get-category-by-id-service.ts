import prisma from "../../config/prisma";

export async function getCategory(
    id: number
) {

    const category =
        await prisma.category.findUnique({
            where: {
                id
            }
        });

    if (!category) {
        throw new Error(
            "Category not found"
        );
    }

    return category;
}