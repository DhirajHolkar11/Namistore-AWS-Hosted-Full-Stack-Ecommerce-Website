import prisma from "../../config/prisma";

type CreateAddressInput = {
    userId: number;
    fullName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isDefault?: boolean;
};

export async function createAddress(
    data: CreateAddressInput
) {

    if (data.isDefault) {

        await prisma.address.updateMany({
            where: {
                userId: data.userId
            },
            data: {
                isDefault: false
            }
        });
    }

    const address =
        await prisma.address.create({
            data
        });

    return address;
}