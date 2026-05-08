import { Request, Response } from "express";
import { providerServices } from "./providerServices";
import paginationSortHelper from "../../helperfunctions/paginationSortingHelper";
import { ProviderParams } from "../../Types/ProviderInputType";


const providerProfileCreate = async (req: Request, res: Response) => {

    try {
        if (!req.user) {
            throw new Error("unauthorized! provider creation failed")
        }

        const currentUser = req.user
        const providerData = req.body

        const result = await providerServices.providerProfileCreate(providerData, currentUser.id)

        res.status(201).json({
            success: true,
            message: "Provider Created Successfully",
            data: result
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getAllProviders = async (req: Request, res: Response) => {
    try {

        const search = typeof req.query.search === "string" ? req.query.search : "";

        const isVerified = req.query.isVerified
            ? req.query.isVerified === "true"
                ? true : req.query.isVerified === "false"
                    ? false
                    : undefined
            : undefined;

        const providerUserId = typeof req.query.userId === "string" ? req.query.userId : undefined;


        const { page, limit, skip, orderBy, sortBy } = paginationSortHelper(req.query)


        const result = await providerServices.getAllProviders({ search, isVerified, providerUserId, page, limit, skip, orderBy, sortBy });

        res.status(200).json({
            success: true,
            message: "Providers Fetched Successfully",
            meta: result.pagination,
            data: result.result
        })

    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong please try again later"
        })
    }
}


const getProviderById = async (req: Request<ProviderParams> , res: Response) => {

    try {
        
        const id = req.params.id

        if(!id.trim()){
            throw new Error("Error! Provider Id is Required?")
        }
        

        const result = await providerServices.getProviderById(id);

        res.status(200).json({
            success: true,
            message: "Provider Fetched Successfully",
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

export const providerControllers = {
    providerProfileCreate,
    getAllProviders,
    getProviderById
}