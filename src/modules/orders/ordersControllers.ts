import { Request, Response } from "express";
import { orderService } from "./ordersServices";
import { orderStatus } from "../../../generated/prisma/enums";

const orderCreate = async (req: Request, res: Response) => {

    try {

        const data = req.body;
        data.userId = req.user?.id;
      
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

const getOrderByProviderId = async (req: Request , res: Response)=> {

    try {

        const providerId = req.params.id as string;

        const filterStatus  = (req.query.status as string) || "PENDING" 

        if(!providerId){
            throw new Error("Missing provider Id")
        }

      const result = await orderService.getOrderByProviderId(providerId, filterStatus as orderStatus)

            res.status(200).json({
                success: true,
                message: "Your Order Fetched Successfully",
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


const updateOrderData = async (req: Request , res: Response)=> {

    try {

        const orderId = Number(req.params.id)

        const data = req.body;
        

      const result = await orderService.updateOrderData(orderId , data)

            res.status(200).json({
                success: true,
                message: "Your Order Data Updated Successfully",
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
    getOrderByProviderId,
    updateOrderData,
}