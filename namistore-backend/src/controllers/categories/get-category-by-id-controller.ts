import { Request, Response } from "express";

import {
    getCategory
}
from "../../services/categories/get-category-by-id-service";

export async function getCategoryController(
    req: Request,
    res: Response
) {

    try {

        const id =
            Number(req.params.id);

        const category =
            await getCategory(id);

        return res.status(200).json({
            success: true,
            category
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