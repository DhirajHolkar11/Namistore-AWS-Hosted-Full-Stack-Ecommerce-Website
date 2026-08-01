import { Request, Response } from "express";

import {getCategories} from "../../services/categories/get-categories-service";

export async function getCategoriesController(
    req: Request,
    res: Response
) {

    try {

        const categories =
            await getCategories();

        return res.status(200).json({
            success: true,
            categories
        });

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
        });
    }
}