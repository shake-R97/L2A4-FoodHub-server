import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),

    trustedOrigins: [process.env.APP_URL!],

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER",
                required: false
            },
            phone: {
                type: "string",
                required: false
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false
            }
        }
    },

    // email and password authentication config
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },

    //   email verification configs
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            console.log({ user, url, token });
            try {

                const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`

                const info = await transporter.sendMail({
                    from: '"FoodHub" <noreply@foodhub.com>',
                    to: user.email,
                    subject: 'Verify Your FoodHub Account',
                    html: `
<div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:40px;">
  <table align="center" width="600" style="background:white; border-radius:8px; padding:30px;">
    
    <tr>
      <td align="center">
        <h2 style="color:#333;">Verify Your Email</h2>
      </td>
    </tr>

    <tr>
      <td style="color:#555; font-size:16px; line-height:1.6;">
        Hello ${user.name},
        <br/><br/>
        Thank you for signing up and welcome to <strong>FoodHub</strong>.
        Please verify your email address by clicking the button below.
      </td>
    </tr>

    <tr>
      <td align="center" style="padding:30px 0;">
        <a href="${verificationUrl}"
          style="
            background-color:#4F46E5;
            color:white;
            padding:12px 24px;
            text-decoration:none;
            border-radius:6px;
            font-size:16px;
            display:inline-block;
          ">
          Verify Email
        </a>
      </td>
    </tr>

    <tr>
      <td style="color:#777; font-size:14px;">
        If the button above does not work, copy and paste the link below into your browser:
        <br/><br/>
        <a href="${verificationUrl}">${verificationUrl}</a>
      </td>
    </tr>

    <tr>
      <td style="padding-top:30px; font-size:13px; color:#999;">
        If you did not create an account, you can safely ignore this email.
      </td>
    </tr>

    <tr>
      <td align="center" style="padding-top:20px; font-size:12px; color:#bbb;">
        © 2026 FoodHub
      </td>
    </tr>

  </table>
</div>
`, // HTML body
                });

                console.log("Message sent: %s", info.messageId);
            } catch (err: any) {
                console.log(err.message);
            }
        },
    },

    // Social or google authentication

     baseURL: process.env.BETTER_AUTH_URL, 
    socialProviders: {
        google: { 
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 

        }, 
    },
});