import { Request, Response } from "express";
import { orderService } from "./ordersServices";

const orderCreate = async (req: Request, res: Response) => {

    try {

        const data = req.body;
      
        const result = await orderService.orderCreate(data)

            res.status(200).json({
                success: true,
                message: "Your Order Placed Successfully",
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

export const orderController = {
    orderCreate,
}