"use client";

import {

    useEffect,

    useState

} from "react";

import {

    useRouter

} from "next/navigation";

import {

    getUserFromToken

} from "@/utils/auth";

type Props = {

    children: React.ReactNode;

};

export default function AdminRoute({

    children

}: Props) {

    const router =

        useRouter();

    const [

        loading,

        setLoading

    ] =

        useState(true);

    useEffect(() => {

        const user =

    getUserFromToken();

if (!user) {

    localStorage.removeItem(

        "token"

    );

    router.replace(

        "/login"

    );

    return;

}



if (user.role !== "ADMIN") {

    router.replace(

        "/profile"

    );

    return;

}

setLoading(false);

    }, [router]);

    if (loading) {

        return <h2>Checking access...</h2>;

    }

    return <>{children}</>;

}