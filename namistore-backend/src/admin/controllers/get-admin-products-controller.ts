import { Request, Response } from "express";

import {
    getAdminProducts
}
from "../services/get-admin-products-service";

export async function getAdminProductsController(
    req: Request,
    res: Response
) {

    try {

        const products =
            await getAdminProducts();

        return res.status(200).json({

            success: true,

            count: products.length,

            products

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