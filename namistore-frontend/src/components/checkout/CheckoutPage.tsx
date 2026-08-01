"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {

    createOrder,

    createPaymentOrder,

    verifyPayment

} from "@/services/checkout.service";

import "@/styles/CheckoutPage.css";

declare global {

    interface Window {

        Razorpay: any;

    }

}

export default function CheckoutPage() {

    const router = useRouter();

    const [loading, setLoading] =

        useState(false);

    async function handleCheckout() {

        try {

            setLoading(true);

            // Step 1

            const orderResponse =

                await createOrder();

            const order =

                orderResponse.order;

            // Step 2

            const paymentResponse =

                await createPaymentOrder(

                    order.id

                );

            const paymentOrder =

                paymentResponse.paymentOrder;

            const options = {

                key:

                    paymentResponse.key,

                amount:

                    paymentOrder.amount,

                currency:

                    paymentOrder.currency,

                name:

                    "My Ecommerce",

                description:

                    "Order Payment",

                order_id:

                    paymentOrder.id,

                handler: async function (

                    response: any

                ) {

                    try {

                        await verifyPayment({

                            razorpayOrderId:

                                response.razorpay_order_id,

                            razorpayPaymentId:

                                response.razorpay_payment_id,

                            razorpaySignature:

                                response.razorpay_signature

                        });

                        alert(

                            "Payment Successful"

                        );

                        router.push(

                            "/orders"

                        );

                    }

                    catch (error) {

                        alert(

                            error instanceof Error

                                ? error.message

                                : "Payment verification failed"

                        );

                    }

                }

            };

            const razorpay =

                new window.Razorpay(

                    options

                );

            razorpay.open();

        }

        catch (error) {

            alert(

                error instanceof Error

                    ? error.message

                    : "Checkout failed"

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="checkout-page">

            <div className="checkout-card">

                <h1>

                    Checkout

                </h1>

                <p>

                    Click below to place your order and pay using Razorpay.

                </p>

                <button

                    onClick={handleCheckout}

                    disabled={loading}

                >

                    {

                        loading

                            ? "Processing..."

                            : "Place Order"

                    }

                </button>

            </div>

        </div>

    );

}