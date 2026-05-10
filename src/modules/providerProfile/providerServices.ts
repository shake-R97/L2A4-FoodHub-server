import { ProviderProfileWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { ProviderInput } from "../../Types/ProviderInputType";

const providerProfileCreate = async (providerData: ProviderInput, userId: string) => {

    const existingProvider = await prisma.providerProfile.findUnique({
        where: { userId }
    });

    if (existingProvider) {
        throw new Error("Provider already exist! you cannot create another")
    }

    const result = await prisma.$transaction(async (tx) => {

        const providerCreate = await tx.providerProfile.create({
            data: {
                ...providerData,
                userId,
                isVerified: false,
                isOpen: true
            }
        });

        await tx.user.update({
            where: {
                id: userId
            },
            data: {
                role: "PROVIDER"
            }
        });
        
        return providerCreate
    })

    return result;
}

const getAllProviders = async (
    { search,
        isVerified,
        providerUserId,
        page,
        limit,
        skip,
        orderBy,
        sortBy
    }:
        {
            search: string,
            isVerified: boolean | undefined,
            providerUserId: string | undefined,
            page: number,
            limit: number,
            skip: number,
            orderBy: string,
            sortBy: string
        }) => {

    const andConditions: ProviderProfileWhereInput[] = [];

    if (search) {
        andConditions.push({
            OR: [
                {
                    businessName: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    city: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    address: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
            ]
        },)
    }

    if (isVerified !== undefined) {
        andConditions.push({
            isVerified
        },)
    }

    if (providerUserId) {
        andConditions.push({
            userId: providerUserId
        })
    }

    const result = await prisma.providerProfile.findMany({

        take: limit,
        skip,
        where: {
            AND: andConditions
        },
        orderBy: {
            [sortBy]: orderBy
        }
    });

    // pagination metadata adding----

    const total = await prisma.providerProfile.count({

        where: {
            AND: andConditions
        }
    })

    return {
        result,
        pagination: {
            totalData: total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)

        }
    }
}

const getProviderById = async (id: string) => {

    const result = await prisma.providerProfile.findUnique({
        where: {
            userId: id
        }
    })

    if (!result) {
        throw new Error(`No Provider Profile Exist with id: ${id}`)
    }

    return result;
}


export const providerServices = {
    providerProfileCreate,
    getAllProviders,
    getProviderById
}