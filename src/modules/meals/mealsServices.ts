import { Meal } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const mealPost = async( payload: Omit<Meal, "providerId">, providerId: string) => {

    const result = await prisma.meal.create({
        data: {
            ...payload,
            providerId
        }
    });

    return result;
}


const mealUpdate = async(payload: Meal , mealId: number)=> {


    const mealExist = await prisma.meal.findUnique({
        where: {
            id : mealId
        }
    })

    if(!mealExist){
        throw new Error("No meal exist with that credential")
    }

    const result = await prisma.meal.update({
        where: {
            id: mealId
        },
        data: payload
    });

    return result;
}


const mealDelete = async(mealId: number)=> {

    const mealExist =  await prisma.meal.findUnique({
        where: {
            id: mealId
        }
    })

    if(!mealExist){
        throw new Error("No meal exist with that credential")
    }

    const result = await prisma.meal.delete({
        where: {
            id: mealId
        }
    })

    return result;
}

export const mealServices = {
    mealPost,
    mealUpdate,
    mealDelete
}