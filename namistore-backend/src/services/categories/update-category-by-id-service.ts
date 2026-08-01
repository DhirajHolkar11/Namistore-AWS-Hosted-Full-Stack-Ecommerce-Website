import prisma from "../../config/prisma";

export async function updateCategory(
    id: number,
    name: string
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






    const existingCategory =
await prisma.category.findUnique({
    where:{
        name:name.trim()
    }
});

if(
    existingCategory &&
    existingCategory.id !== id
){
    throw new Error(
        "Category already exists"
    );
}






    const updatedCategory =
        await prisma.category.update({
            where: {
                id
            },
            data: {
                name:name.trim()
            }
        });

    return updatedCategory;
}
