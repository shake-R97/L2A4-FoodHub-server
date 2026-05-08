import { NextFunction, Request, Response } from "express"
import { Role } from "../Types/authorizeRolesTypes";
import { auth as betterAuth } from "../lib/auth"
import { fromNodeHeaders } from "better-auth/node";


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: string;
                emailVerification: boolean;
            }
        }
    }
}

const auth = (...roles: Role[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {


            // get session 
            const session = await betterAuth.api.getSession({
                headers: fromNodeHeaders(req.headers)
            })

            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized! Please SignUp or LogIn"
                })
            }


            req.user = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role as string,
                emailVerification: session.user.emailVerified
            }



            if (!req.user.emailVerification) {
                return res.status(403).json({
                    success: false,
                    message: "Email Verification Required. Please verify your Email"
                })
            }

            if (req.user.role.length && !roles.includes(req.user.role as Role)) {
                return res.status(403).json({
                    success: false,
                    message: `You are not authorized for : ${req.path}. ! Access Denied . Please go back.`
                })
            }

            next()

        } catch (err: any) {
            next(err)
        }
    }
}

export default auth;