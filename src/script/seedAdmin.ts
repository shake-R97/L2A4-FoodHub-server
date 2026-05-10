import { prisma } from "../lib/prisma";
import { Role } from "../Types/authorizeRolesTypes";

async function seedAdmin() {
    
    try {
        console.log("---------Admin Seeding Started---------");
        // admin data
        const adminData = {
            name : "Admin1",
            email: "admin1@gmail.com",
            role: Role.ADMIN,
            password: "111ADMIN999"
        }
        
        console.log("---------Checking Admin Exist Or Not--------");
        // check user on db or not
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });

        if(existingUser){
            throw new Error("admin email already exist")
        }

        console.log("------Checking Finished-------");



        const res = await fetch("http://localhost:5000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:4000"
            },
            body: JSON.stringify(adminData)
        })


        if(res.ok){

            console.log("***********ADMIN CREATED**********");

            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
            })

            console.log("-------Email Verification Status Updated-----");
        }

        
        console.log("********SUCCESS**********");

    } catch (error : any) {
        console.log(error.message);
    }
}

seedAdmin()