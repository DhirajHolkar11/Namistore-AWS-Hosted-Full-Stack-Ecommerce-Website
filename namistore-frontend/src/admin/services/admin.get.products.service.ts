import { apiFetch } from "@/services/api.service";

export async function getAdminProducts() {

    return apiFetch("/admin/products");

}