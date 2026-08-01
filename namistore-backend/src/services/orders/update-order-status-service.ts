// import prisma from "../../config/prisma";

// import { OrderStatus }
// from "../../generated/prisma";

// type UpdateOrderStatusInput = {
//     orderId: number;
//     status: OrderStatus;
// };

// export async function updateOrderStatus(
//     data: UpdateOrderStatusInput
// ) {

//     const order =
//         await prisma.order.findUnique({
//             where: {
//                 id: data.orderId
//             }
//         });

//     if (!order) {
//         throw new Error(
//             "Order not found"
//         );
//     }

//     const updatedOrder =
//         await prisma.order.update({
//             where: {
//                 id: data.orderId
//             },
//             data: {
//                 status: data.status
//             }
//         });

//     return updatedOrder;
// }









import prisma from "../../config/prisma";

import { OrderStatus }
from "../../generated/prisma";

type UpdateOrderStatusInput = {
    orderId: number;
    status: OrderStatus;
};

export async function updateOrderStatus(
    data: UpdateOrderStatusInput
) {

    const order =
        await prisma.order.findUnique({
            where: {
                id: data.orderId
            }
        });

    if (!order) {
        throw new Error(
            "Order not found"
        );
    }

    const allowedTransitions: Record<
        OrderStatus,
        OrderStatus[]
    > = {

        PENDING: [
            OrderStatus.PROCESSING,
            OrderStatus.CANCELLED
        ],

        PROCESSING: [
            OrderStatus.SHIPPED,
            OrderStatus.CANCELLED
        ],

        SHIPPED: [
            OrderStatus.DELIVERED
        ],

        DELIVERED: [],

        CANCELLED: []
    };

    const canMoveTo =
        allowedTransitions[
            order.status
        ];

    if (
        !canMoveTo.includes(
            data.status
        )
    ) {
        throw new Error(
            `Cannot change order status from ${order.status} to ${data.status}`
        );
    }

    return await prisma.order.update({
        where: {
            id: data.orderId
        },
        data: {
            status: data.status
        }
    });


    
}