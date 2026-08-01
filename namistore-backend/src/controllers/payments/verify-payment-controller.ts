import { Request, Response }
from "express";

import { verifyPayment }
from "../../services/payments/verify-payment-service";

export async function verifyPaymentController(
    req: Request,
    res: Response
) {

    try {

        const {
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature
        } = req.body;

        const order =
            await verifyPayment({
                razorpayOrderId,
                razorpayPaymentId,
                razorpaySignature
            });

        return res.status(200).json({
            success: true,
            message:
                "Payment verified successfully",
            order
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