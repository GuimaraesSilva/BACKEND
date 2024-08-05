import express, { Express } from "express";
import cors from "cors";
import usersRouter from "./routers/userRouter.js";
import productsRouter from "./routers/productRouter.js";

import mongoose from "mongoose";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

const app: Express = express();
dotenv.config();
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(usersRouter);
app.use(productsRouter);

app.use(express.static("static"));

const PORT = process.env.PORT || 3000;

const startApp = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGO_URI || "");
        console.log("Connected to db");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startApp();
