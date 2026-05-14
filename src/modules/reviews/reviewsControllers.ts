import { Request, Response } from "express";
import { reviewService } from "./reviewsServices";

const reviewCreate = async (req: Request, res: Response) => {

    try {

        const user = req.user
        const data = req.body
        data.userId = user?.id;

        console.log(user);
        
        const result = await reviewService.reviewCreate(data)

        res.status(200).json({
            success: true,
            message: "Review Created Successfully",
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

export const reviewController = {
    reviewCreate,
}