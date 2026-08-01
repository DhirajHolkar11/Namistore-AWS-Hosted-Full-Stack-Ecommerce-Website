import { Request, Response } from "express";

import {
    updateCategory
}
from "../../services/categories/update-category-by-id-service";

export async function updateCategoryController(
    req: Request,
    res: Response
) {

    try {

        const id =
            Number(req.params.id);

        const { name } =
            req.body;


            
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

        const category =
            await updateCategory(
                id,
                name
            );

        return res.status(200).json({
            success: true,
            category
        });

    }
    catch (error) {

        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
        });
    }
}