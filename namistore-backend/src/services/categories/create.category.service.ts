import prisma from "../../config/prisma";

export async function createCategory(
    name:string
){

    


    const existingCategory =
await prisma.category.findUnique({
    where:{
        name:name.trim()
    }
});


    if(existingCategory){
        throw new Error(
            "category already exists"
        );
    }

    const category = await prisma.category.create({
        data:{
            name:name.trim(),
        },
    });

    return category;
}