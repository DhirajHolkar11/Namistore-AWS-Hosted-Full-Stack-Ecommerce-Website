import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { createAddress }
from "../../services/address/create-address-service";

export async function createAddressController(
    req: AuthRequest,
    res: Response
) {

    try {

        const userId =
            req.user?.userId;

        if (!userId) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const address =
            await createAddress({
                userId,
                ...req.body
            });

        return res.status(201).json({
            success: true,
            address
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