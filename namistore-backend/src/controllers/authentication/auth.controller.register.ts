import { Request,Response } from "express";

import { registerUser } from "../../services/authentication/auth.service.register";

export async function register(

    req:Request,
    res:Response
)
{
    try{

        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;



        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({
                success:false,
                message:"all fields are required",
            });
        }

        if (password.length < 6){
            return res.status(400).json({
                success:false,
                message:"password must be at least 6 characters",
            });
        }

        const user = await registerUser(
            firstName,
            lastName,
            email,
            password
        );

        res.status(201).json({
            success:true,
            message:"user registered successfully",
            user,
        });
        
    } catch(error){

        res.status(400).json({
            success:false,
            message:
            error instanceof Error?error.message:"Something went wront",

        });

    }
}