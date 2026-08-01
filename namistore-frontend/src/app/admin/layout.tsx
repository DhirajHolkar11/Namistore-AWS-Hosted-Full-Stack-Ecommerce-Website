"use client";
import AdminRoute from "@/admin/components/AdminRoute";

export default function AdminLayout({

    children,

}: {

    children: React.ReactNode;

}) {

    return (

        <AdminRoute>

            {children}

        </AdminRoute>

    );

}