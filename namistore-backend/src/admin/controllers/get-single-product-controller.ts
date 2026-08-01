import { Request, Response } from "express";

import {
    getSingleProduct
} from "../services/get-single-product-service";

export async function getSingleProductController(
    req: Request,
    res: Response
) {

    try {

        const id =
            Number(req.params.id);

        if (isNaN(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid product id"

            });

        }

        const product =
            await getSingleProduct(id);

        return res.status(200).json({

            success: true,

            product

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