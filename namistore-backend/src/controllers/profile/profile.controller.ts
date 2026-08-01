import { Response } from "express";

import { AuthRequest } from "../../middleware/auth.middleware";

import { getProfile } from "../../services/profile/profile.service";


export async function profile(
    req:AuthRequest,
    res:Response
){
    
    try{
        const userId = req.user?.userId;

        if(!userId){
            return res.status(401).json({
                success:false,
                message:"Unauthorized",
            });
        }


        const user = await getProfile(userId);

        return res.status(200).json({
            success:true,
            user,
        });

    }
    catch(error){

        return res.status(404).json({
            success:false,
            message:
            error instanceof Error? error.message:"something went wrong",
        });
    }
}