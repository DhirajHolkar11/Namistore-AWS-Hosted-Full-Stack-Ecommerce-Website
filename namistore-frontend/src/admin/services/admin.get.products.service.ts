import { apiFetch } from "./api.service";

export async function getAdminProducts() {

    return apiFetch("/admin/products");

}