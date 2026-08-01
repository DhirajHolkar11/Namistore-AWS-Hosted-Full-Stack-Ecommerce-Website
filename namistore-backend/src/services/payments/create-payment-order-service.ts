import prisma from "../../config/prisma";
import razorpay from "../../config/razorpay";

export async function createPaymentOrder(
    orderId: number,
    userId: number
) {

    const order =
        await prisma.order.findUnique({
            where: {
                id: orderId
            }
        });

    if (!order) {
        throw new Error(
            "Order not found"
        );
    }

    if (order.userId !== userId) {
        throw new Error(
            "Unauthorized"
        );
    }

    const razorpayOrder =
        await razorpay.orders.create({

            amount:
                Number(order.totalAmount) * 100,

            currency: "INR",

            receipt:
                `order_${order.id}`
        });

    await prisma.order.update({
        where: {
            id: order.id
        },
        data: {
            paymentId: razorpayOrder.id
        }
    });

    return razorpayOrder;
}