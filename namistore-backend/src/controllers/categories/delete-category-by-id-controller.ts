import { Request, Response } from "express";

import {
    deleteCategory
}
from "../../services/categories/delete-category-by-id-service";

export async function deleteCategoryController(
    req: Request,
    res: Response
) {

    try {

        const id =
            Number(req.params.id);



            

        if(isNaN(id)){
    return res.status(400).json({
        success:false,
        message:"Invalid category id"
    });
}

        await deleteCategory(id);

        return res.status(200).json({
            success: true,
            message:
                "Category deleted successfully"
        });

    }
    catch (error) {

        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
        });
    }
}