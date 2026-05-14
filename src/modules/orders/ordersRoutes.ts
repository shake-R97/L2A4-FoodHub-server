import express from "express";
import { Role } from "../../Types/authorizeRolesTypes";
import auth from "../../middleWare/auth";
import { orderController } from "./ordersControllers";

const router = express.Router();


router.post(
    "/",
    auth(Role.USER, Role.ADMIN),
    orderController.orderCreate
)

router.get(
    "/providerId/:id",
    auth(Role.ADMIN , Role.PROVIDER),
    orderController.getOrderByProviderId
)

router.put(
    "/update/:id",
    auth(Role.ADMIN , Role.PROVIDER),
    orderController.updateOrderData
)




export const orderRoutes = router;