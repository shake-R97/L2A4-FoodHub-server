import express from "express";
import auth from "../../middleWare/auth";
import { Role } from "../../Types/authorizeRolesTypes";
import { userController } from "./userController";

const router = express.Router();

router.get(
    "/",
    auth(Role.ADMIN),
    userController.getAllUser
)


export const userRoutes = router;