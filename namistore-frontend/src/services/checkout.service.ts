import { apiFetch } from "./api.service";

export async function createOrder() {

    return apiFetch(

        "/orders",

        {

            method: "POST"

        }

    );

}

export async function createPaymentOrder(

    orderId: number

) {

    return apiFetch(

        "/payments/create-order",

        {

            method: "POST",

            body: JSON.stringify({

                orderId

            })

        }

    );

}

export async function verifyPayment(

    data: {

        razorpayOrderId: string;

        razorpayPaymentId: string;

        razorpaySignature: string;

    }

) {

    return apiFetch(

        "/payments/verify",

        {

            method: "POST",

            body: JSON.stringify(data)

        }

    );

}