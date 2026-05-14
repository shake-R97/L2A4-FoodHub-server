import express from "express";
import auth from "../../middleWare/auth";
import { Role } from "../../Types/authorizeRolesTypes";
import { reviewController } from "./reviewsControllers";

const router = express.Router();

router.post(
    "/",
    auth(Role.USER, Role.ADMIN, Role.PROVIDER),
    reviewController.reviewCreate
)


export const reviewRoutes = router;