import { Request, Response } from "express";

import {
    activateProduct
}
from "../../services/products/activate-single-product-service";

export async function activateProductController(
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

        await activateProduct(id);

        return res.status(200).json({

            success: true,

            message: "Product activated successfully"

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