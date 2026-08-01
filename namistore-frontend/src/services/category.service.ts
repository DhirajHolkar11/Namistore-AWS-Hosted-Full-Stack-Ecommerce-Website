import { apiFetch } from "./api.service";

export async function getCategories() {

    return apiFetch(

        "/categories"

    );

}