import { toNodeHandler } from "better-auth/node";
import express from "express"
import { auth } from "./lib/auth";
import cors from "cors"
import { providerRoutes } from "./modules/providerProfile/providerRoutes";
import { mealRoutes } from "./modules/meals/mealsRoutes";
import { userRoutes } from "./modules/user/userRoutes";
import { orderRoutes } from "./modules/orders/ordersRoutes";

const app = express()

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true
}))


app.use(express.json())

app.all("/api/auth/{*any}", toNodeHandler(auth));

// user route
app.use("/users", userRoutes)

// provider routes
app.use("/provider", providerRoutes)

// meals routes
app.use("/meal", mealRoutes)

// order routes
app.use("/order", orderRoutes)

app.get('/', (req, res) => {
  res.send('Hello World From Foodhub Server!')
})


export default app;