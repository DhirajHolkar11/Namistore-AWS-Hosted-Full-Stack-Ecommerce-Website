import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

interface jwtUserPayload{
    userId:number;
    email:string;
    role:string;
};

export interface AuthRequest extends Request{
    user?:jwtUserPayload;
}


export function authenticateToken(req:AuthRequest, res:Response,next:NextFunction){


    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            success:false,
            message:"token missing",
        });
    }

    const token = authHeader.split(" ")[1];

    try{

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );
        

        
        
        req.user = decoded as jwtUserPayload;
        next();
    }
    catch(error){

        return res.status(401).json({
            success:false,
            message:"invalid token",
        });
    }
}