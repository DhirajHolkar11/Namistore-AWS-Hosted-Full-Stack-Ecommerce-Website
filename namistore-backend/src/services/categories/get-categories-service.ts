// import prisma from "../config/prisma";

// export async function getCategories() {

//     const categories =
//         await prisma.category.findMany({
//             orderBy: {
//                 name: "asc"
//             }
//         });

//     return categories;
// }

// export default getCategories;





import prisma from "../../config/prisma";

export async function getCategories(){

    const categories =
    await prisma.category.findMany({
        orderBy:{
            name:"asc"
        },
        include:{
            _count:{
                select:{
                    products:true
                }
            }
        }
    });

    return categories;
}