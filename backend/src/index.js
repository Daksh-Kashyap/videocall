import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "node:http";
import dotenv from "dotenv";
dotenv.config();

import connectToSocket from "./controller/socketManager.js";
import userRoutes from "./routes/user.routes.js"

const app=express(); 
const server = createServer(app);  
const io=connectToSocket(server);


app.set("port",(process.env.PORT || 8080))
app.use(cors());
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({limit:"40kb",extended:true}))
app.use("/api/v1/users",userRoutes);

const start=async ()=>{
    server.listen(app.get("port"),()=>{
        console.log(`Server running on port ${app.get("port")}`);
    })
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    }


start();