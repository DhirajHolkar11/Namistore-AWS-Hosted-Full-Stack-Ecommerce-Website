


"use client";

import { useEffect, useState } from "react";

import { apiFetch }
from "@/services/api.service";

import "@/styles/OrdersPage.css";
import { Tiro_Tamil } from "next/font/google";

type Order = {

    id: number;

    totalAmount: number;

    status: string;

    paymentStatus: string;

    createdAt: string;

    items: {

        id: number;

        quantity: number;

        product: {

            id: number;

            name: string;

            imageUrl: string;

            price: number;

        };

    }[];

};

export default function OrdersPage() {

    const [

        orders,

        setOrders

    ] =

        useState<Order[]>([]);

    const [

        loading,

        setLoading

    ] =

        useState(true);

    const [

        error,

        setError

    ] =

        useState("");

    useEffect(() => {

        async function loadOrders() {

            try {

                const data =

                    await apiFetch(

                        "/orders"

                    );
                    console.log("data prints here");
                    console.log(data.orders);

                setOrders(

                    data.orders

                );

            }

            catch (error) {

                setError(

                    error instanceof Error

                        ? error.message

                        : "Failed to load orders"

                );

            }

            finally {

                setLoading(false);

            }

        }

        loadOrders();

    }, []);

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    
    return (

        <div className="orders-page">

            <h1>My Orders</h1>

            {

                orders.length === 0 && (

                    <p>

                        You have not placed any orders yet.

                    </p>

)

}

            <div className="orders-container">

                {
                  
                  orders.map(
                    
                    (order) => {
                      
                      const firstItem =
                      
                      order.items[0];
                      
                      if(!firstItem){
                        return null;
                      }
                      const totalItems = order.items.reduce((total,item)=>total+item.quantity,0);



                            return (

                                <div

                                    key={order.id}

                                    className="order-card"

                                >

                                    <img

                                        src={`${process.env.NEXT_PUBLIC_API_URL}${firstItem.product.imageUrl}`}

                                        alt={firstItem.product.name}

                                        className="order-image"

                                    />

                                    <div className="order-details">

                                        <h3>

                                            {

                                                firstItem.product.name

                                            }

                                        </h3>

                                        <p>

                                            {

                                                totalItems

                                            }

                                            {

                                                totalItems === 1

                                                ?

                                                " item"

                                                :

                                                " items"

                                            }

                                        </p>

                                        <p>

                                            Order #

                                            {order.id}

                                        </p>

                                        <p>

                                            {

                                                new Date(

                                                    order.createdAt

                                                ).toLocaleDateString()

                                            }

                                        </p>

                                    </div>

                                    <div className="order-summary">

                                        <h3>

                                            ₹

                                            {

                                                Number(

                                                    order.totalAmount

                                                ).toLocaleString()

                                            }

                                        </h3>

                                        <span

                                            className={`status ${order.status.toLowerCase()}`}

                                        >

                                            {

                                                order.status

                                            }

                                        </span>

                                        <span

                                            className={`payment ${order.paymentStatus.toLowerCase()}`}

                                        >

                                            {

                                                order.paymentStatus

                                            }

                                        </span>

                                    </div>

                                </div>

                            );

                        }

                    )

                }

            </div>

        </div>

    );

}