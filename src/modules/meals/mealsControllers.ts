import { Request, Response } from "express";
import { mealServices } from "./mealsServices";

const mealPost = async(req: Request, res: Response)=> {

    try {

        const userRole = req.user?.role; 

        if(userRole === "USER"){
            throw new Error("To add Meal , You have to create Provider Profile First")
        }

        const data = req.body;

        const result = await mealServices.mealPost(data)

       res.status(200).json({
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


export const mealControllers = {
    mealPost,
}