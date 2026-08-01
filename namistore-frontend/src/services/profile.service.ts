import { apiFetch }
from "./api.service";

export async function getProfile() {

    return apiFetch(
        "/profile",
        {
            method: "GET"
        }
    );
}