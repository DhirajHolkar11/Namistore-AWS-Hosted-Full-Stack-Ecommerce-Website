import bcrypt from 'bcrypt'
import prisma from "../../config/prisma";

export async function registerUser(
    firstName:string,
    lastName:string,
    email:string,
    password:string

)
{

    const existingUser = await prisma.user.findUnique(
        {
            where:
            {
                email,
            },
        },
    )



    if(existingUser){

        throw new Error(
            "user already exists"
        );
    }



    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data:{
            firstName,
            lastName,
            email,
            password:hashedPassword,

            role:"USER"
        }
    })


    return {
        id:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email
    };


}