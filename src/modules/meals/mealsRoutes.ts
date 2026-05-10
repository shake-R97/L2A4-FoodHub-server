import express from "express";
import auth from "../../middleWare/auth";
import { Role } from "../../Types/authorizeRolesTypes";
import { mealControllers } from "./mealsControllers";

const router = express.Router();

router.post(
    "/",
    auth(Role.PROVIDER , Role.ADMIN),
    mealControllers.mealPost
 )

 router.put(
    "/update/:id",
    auth(Role.PROVIDER , Role.ADMIN),
    mealControllers.mealUpdate
 )

 router.delete(
    "/delete/:id",
    auth(Role.ADMIN, Role.PROVIDER)
 )


export const mealRoutes = router;