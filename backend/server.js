import express from "express";
import connectDB from "./database/db.js";

const app = express()

const PORT = process.env.PORT || 5000
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})