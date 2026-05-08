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


export const mealRoutes = router;