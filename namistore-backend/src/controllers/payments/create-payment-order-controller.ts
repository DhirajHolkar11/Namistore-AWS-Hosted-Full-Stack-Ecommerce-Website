import { Response } from "express";

import { AuthRequest }
from "../../middleware/auth.middleware";

import { createPaymentOrder }
from "../../services/payments/create-payment-order-service";

export async function createPaymentOrderController(
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

        const { orderId } =
            req.body;

        const paymentOrder =
            await createPaymentOrder(
                orderId,
                userId
            );

        // return res.status(200).json({
        //     success: true,
        //     paymentOrder
        // });

        return res.status(200).json({
    success: true,
    paymentOrder,

    key: process.env.RAZORPAY_KEY_ID
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