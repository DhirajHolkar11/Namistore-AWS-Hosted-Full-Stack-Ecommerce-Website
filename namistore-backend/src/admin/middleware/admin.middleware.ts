import { Response, NextFunction} from "express";
import { AuthRequest } from "../../middleware/auth.middleware";

export function authorizeAdmin(
    req:AuthRequest,
    res:Response,
    next:NextFunction
){

    if(!req.user){
        return res.status(401).json({
            success:false,
            message:"unauthorized"
        });
    }



    if(req.user.role !== "ADMIN"){
        return res.status(403).json({
            success:false,
            message:"admin access required"
        });
    }

    next();

}