import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import hotelRouter from "./routes/hotels.js";
import roomRouter from "./routes/rooms.js";
import userRouter from "./routes/users.js";
const app = express();      
dotenv.config();

const DB = process.env.DATABASE.replace('<password>',
  process.env.DATABASE_PASSWORD
);

const connect = async () => {
try{
    await mongoose.connect(DB);
    console.log("Successfully connected to MongoDB");
} catch(error){
    console.log(error);
}
};

// middlewares

app.use(express.json());
app.use("/auth")

app.listen(8000, () => {
    connect();
    console.log("Server is running on port 8000.");
});