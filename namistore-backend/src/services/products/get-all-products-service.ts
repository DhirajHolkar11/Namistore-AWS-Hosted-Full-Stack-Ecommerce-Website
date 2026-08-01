


import prisma from "../../config/prisma";

type GetProductsOptions = {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
};

export async function getProducts(
    options: GetProductsOptions
) {

    const {
        page = 1,
        limit = 10,
        search,
        categoryId,
        minPrice,
        maxPrice
    } = options;

    const skip = (page - 1) * limit;

    const where: any = {
        isActive: true
    };

    if (search) {
        where.name = {
            contains: search,
            mode: "insensitive"
        };
    }

    if (categoryId) {
        where.categoryId = categoryId;
    }

    if (minPrice || maxPrice) {

        where.price = {};

        if (minPrice) {
            where.price.gte = minPrice;
        }

        if (maxPrice) {
            where.price.lte = maxPrice;
        }
    }

    const products =
        await prisma.product.findMany({
            where,

            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },

            orderBy: {
                createdAt: "desc"
            },

            skip,
            take: limit
        });

    const totalProducts =
        await prisma.product.count({
            where
        });

    return {
        products,
        totalProducts,
        totalPages: Math.ceil(
            totalProducts / limit
        ),
        currentPage: page
    };
}