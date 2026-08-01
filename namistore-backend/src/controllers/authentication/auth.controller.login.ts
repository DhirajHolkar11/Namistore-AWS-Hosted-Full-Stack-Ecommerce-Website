
import {Request, Response} from "express";
import { loginUser } from "../../services/authentication/auth.service.login";

export async function login(

    req:Request,
    res:Response
){

    try{

        const{
            email,
            password,
        } = req.body;


        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"email and password are required",
            });
        }


        const result = await loginUser(
            email,
            password
        );

        return res.status(200).json({
            success:true,
            message:"login successful",
            ...result,
        })




    } catch(error){


        return res.status(401).json({
            success:false,
            message:error instanceof Error ? error.message:"something went wrong",
        });
    }

}