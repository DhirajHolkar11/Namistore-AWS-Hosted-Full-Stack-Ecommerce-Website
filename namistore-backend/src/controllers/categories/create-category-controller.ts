import { Request,Response } from "express";

import { createCategory } from "../../services/categories/create.category.service";

export async function createCategoryController(

    req:Request,
    res:Response
){

    try{

        
        const { name } = req.body;

if (
    !name ||
    typeof name !== "string" ||
    !name.trim()
) {
    return res.status(400).json({
        success:false,
        message:"Valid category name is required"
    });
}

        const category = await createCategory(name);

        return res.status(201).json({
            success:true,
            category,
        });
    }
    catch(error){

        return res.status(400).json({
            success:false,
            message: error instanceof Error? error.message:"Something went wrong",
        });
    }


}