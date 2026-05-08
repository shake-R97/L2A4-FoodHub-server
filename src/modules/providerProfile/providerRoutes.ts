import express from "express"
import { providerControllers } from "./providerController";
import auth from "../../middleWare/auth";
import { Role } from "../../Types/authorizeRolesTypes";


const router = express.Router();

// get All providerProfile--
router.get(
    "/",
    providerControllers.getAllProviders
)

// get providerProfile by Id
router.get("/:id",
    providerControllers.getProviderById
)

// creating providerProfile--
router.post(
    "/create",
    auth(Role.USER , Role.ADMIN),
    providerControllers.providerProfileCreate)


export const providerRoutes = router;