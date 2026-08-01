export type WishlistItem = {

    id: number;

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

export type Wishlist = {

    id: number;

    items: WishlistItem[];

};