




export async function getCategories() {

    const token =
        localStorage.getItem("token");

    const response =
        await fetch(
            "http://localhost:5000/api/categories",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message
        );

    }

    return data;

}

export async function createProduct(
    formData: FormData
) {

    const token =
        localStorage.getItem("token");

    const response =
        await fetch(
            "http://localhost:5000/api/products",
            {
                method: "POST",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                },

                body: formData
            }
        );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message
        );

    }

    return data;

}



export async function deleteProduct(
    id: number
) {

    const token =
        localStorage.getItem("token");

    const response =
        await fetch(

            `http://localhost:5000/api/products/${id}`,

            {

                method: "DELETE",

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            }

        );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message
        );

    }

    return data;

}


export async function activateProduct(
    id: number
) {

    const token =
        localStorage.getItem("token");

    const response =
        await fetch(

            `http://localhost:5000/api/products/${id}/activate`,

            {

                method: "PUT",

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            }

        );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message
        );

    }

    return data;

}



export async function getAdminProduct(
    id: number
) {

    const token =
        localStorage.getItem("token");

    const response =
        await fetch(

            `http://localhost:5000/api/admin/products/${id}`,

            {

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            }

        );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message
        );

    }

    return data;

}

export async function updateProduct(
    id: number,
    formData: FormData
) {

    const token =
        localStorage.getItem("token");

    const response =
        await fetch(

            `http://localhost:5000/api/products/${id}`,

            {

                method: "PUT",

                headers: {

                    Authorization:
                        `Bearer ${token}`

                },

                body: formData

            }

        );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message
        );

    }

    return data;

}