// import prisma from "../config/prisma";

// export async function deleteCategory(
//     id: number
// ) {

//     const category =
//         await prisma.category.findUnique({
//             where: {
//                 id
//             }
//         });

//     if (!category) {
//         throw new Error(
//             "Category not found"
//         );
//     }

//     await prisma.category.delete({
//         where: {
//             id
//         }
//     });

//     return true;
// }








import prisma from "../../config/prisma";

export async function deleteCategory(
    id:number
){

    const category =
    await prisma.category.findUnique({
        where:{
            id
        },
        include:{
            products:true
        }
    });

    if(!category){
        throw new Error(
            "Category not found"
        );
    }

    if(
        category.products.length > 0
    ){
        throw new Error(
            "Cannot delete category that contains products"
        );
    }

    await prisma.category.delete({
        where:{
            id
        }
    });

    return true;
}