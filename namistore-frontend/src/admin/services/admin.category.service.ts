import { apiFetch } from "./api.service";

export async function createCategory(
    name: string
) {

    return apiFetch(
        "/categories",
        {
            method: "POST",

            body: JSON.stringify({
                name
            })
        }
    );
}