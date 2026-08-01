export type CartItem = {
    id: number;

    quantity: number;

    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;

        category: {
            id: number;
            name: string;
        };
    };
};

export type Cart = {
    id: number;
    items: CartItem[];
};