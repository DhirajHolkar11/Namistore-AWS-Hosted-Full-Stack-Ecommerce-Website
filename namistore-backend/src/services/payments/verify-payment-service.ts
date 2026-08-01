

import crypto from "crypto";

import prisma from "../../config/prisma";

type VerifyPaymentInput = {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
};

export async function verifyPayment(
    data: VerifyPaymentInput
) {

    const body =
        `${data.razorpayOrderId}|${data.razorpayPaymentId}`;

    const expectedSignature =
        crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET!
            )
            .update(body)
            .digest("hex");

    const isValid =
        expectedSignature ===
        data.razorpaySignature;

    if (!isValid) {
        throw new Error(
            "Invalid payment signature"
        );
    }

    const order =
        await prisma.order.findFirst({
            where: {
                paymentId:
                    data.razorpayOrderId
            }
        });

    if (!order) {
        throw new Error(
            "Order not found"
        );
    }

    const updatedOrder =
        await prisma.order.update({
            where: {
                id: order.id
            },

            data: {
                paymentStatus: "PAID"
            }
        });

    return updatedOrder;
}