import { prisma } from "../../lib/prisma"

const getAllUser = async () => {

    const user = await prisma.user.findMany();

    const provider = await prisma.user.findMany({
         where: {
            role: "PROVIDER"
        }
    });

    const totalUser = await prisma.user.count();

    const totalProvider = await prisma.user.count({
        where: {
            role: "PROVIDER"
        }
    });

    return {
        user,
        provider,
        totalUser,
        totalProvider
    }
}

export const userServices = {
    getAllUser,
}