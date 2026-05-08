import { Request, Response } from "express";
import { userServices } from "./userServices";

const getAllUser = async (req: Request, res: Response) => {

    try {

        console.log(req.user);

        if(req.user?.role !== "ADMIN"){
            throw new Error("Access Denied, Please Go Back")
        }

        const result = await userServices.getAllUser();

       res.status(200).json({
            success: true,
            message: "All user fetched Successfully",
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

export const userController = {
    getAllUser,
}