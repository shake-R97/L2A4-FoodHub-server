import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const reviewCreate = async(payload: Review)=> {

    await prisma.meal.findUniqueOrThrow({
        where: {
            id: payload.mealId
        }
    })

    if(payload.userId){
        await prisma.user.findUniqueOrThrow({
            where: {
                id: payload.userId
            }
        })
    }


    // CREATE REVIEW
    const result = await prisma.review.create({
        data: payload
    })


    // Calculating data rating and avg_rating

    const updateRating = await prisma.review.aggregate({
        where: {
            mealId: payload.mealId,
            status: "APPROVED"
        },
        _avg: {
            rating: true
        },
        _count: {
            rating: true
        }
    })

    // Update meal table data rating and avg_rating
    await prisma.meal.update({
        where:{
            id: payload.mealId
        },
        data: {
            averageRating: updateRating._avg.rating || 0,
            ratingCount: updateRating._count.rating
        }
    })

    return result;
}

export const reviewService = {
    reviewCreate
}