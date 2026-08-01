import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../config/prisma";

export async function loginUser(email:string, password:string){

    const user = await prisma.user.findUnique({
        where:{
            email,
        },
    });

    if(!user){
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email:user.email,
            role:user.role
        },

        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d",
        }
    
    );

    return{
        token,
        user:{
            id:user.id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            role:user.role,
        },
    };

}