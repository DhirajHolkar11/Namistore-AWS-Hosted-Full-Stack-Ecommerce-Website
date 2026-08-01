import { jwtDecode } from "jwt-decode";

type TokenPayload = {

    userId: number;

    email: string;

    role: string;

    exp: number;

};

export function getUserFromToken() {

    const token =

        localStorage.getItem("token");

    if (!token) {

        return null;

    }

    try {

        const user =

            jwtDecode<TokenPayload>(

                token

            );

        const currentTime =

            Math.floor(

                Date.now() / 1000

            );

        if (user.exp < currentTime) {

            localStorage.removeItem(

                "token"

            );

            return null;

        }

        return user;

    }

    catch {

        localStorage.removeItem(

            "token"

        );

        return null;

    }

}