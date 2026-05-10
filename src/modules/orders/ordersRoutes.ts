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




export const orderRoutes = router;