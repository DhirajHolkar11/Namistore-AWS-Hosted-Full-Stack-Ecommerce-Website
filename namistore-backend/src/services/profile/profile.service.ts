import prisma from "../../config/prisma";

export async function getProfile(
    userId:number
){

    const user = 
    await prisma.user.findUnique({
        where:{
            id:userId,
        },
        select:{
            id:true,
            firstName:true,
            lastName:true,
            email:true,
        },

    });

    

    if(!user){
        throw new Error(
            "User not found"
        );
    }

    return user;
}