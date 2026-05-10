import { Request, Response } from "express";
import { mealServices } from "./mealsServices";

const mealPost = async(req: Request, res: Response)=> {

    try {

        const userRole = req.user?.role; 
        console.log(req.user);

        if(userRole === "USER"){
            throw new Error("To add Meal , You have to create Provider Profile First")
        }

        const data = req.body;
        const providerId = req.user?.id as string;

        const result = await mealServices.mealPost(data , providerId)

       res.status(201).json({
            success: true,
            message: "Your Meal Created Successfully",
            data: result

        })
    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong please Check Credentials again",
            error: err.message
        })
    }
}


const mealUpdate = async(req: Request , res: Response)=> {

    try {

        const data = req.body;
        const mealId = Number(req.params.id);
        console.log({data, mealId});
        
        const result = await mealServices.mealUpdate(data , mealId)

        res.status(200).json({
            success: true,
            message: "Your Meal Updated Successfully",
            data: result

        })
    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong please Check Credentials again",
            error: err.message
        })
    }
}


const mealDelete = async(req: Request , res: Response)=> {

    try {

        const mealId = Number(req.params.id);
        
        const result = await mealServices.mealDelete(mealId)

        res.status(200).json({
            success: true,
            message: "Your Meal Deleted Successfully",
            data: result

        })
    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong please Check Credentials again",
            error: err.message
        })
    }
}

export const mealControllers = {
    mealPost,
    mealUpdate,
    mealDelete
}