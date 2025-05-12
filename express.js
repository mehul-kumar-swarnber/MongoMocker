// const express = require('express')
// it remains separated
import express from "express";
import { DummyData } from "./models/dummyData.js";
import mongoose from "mongoose";
import path from "path";

const app = express();
const port = 3000;

// Serve static files (like HTML, CSS, JS) 
app.use(express.static("public"));

// Connect to MongoDB (replace <your_mongodb_url> with your actual MongoDB connection string)
// mongoose.connect("<your_mongodb_url>", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("MongoDB Connected"))
// .catch((err) => console.error("MongoDB Connection Failed:", err));

// Connecting to MongoDB 
let conn = await mongoose.connect("mongodb://localhost:27017/dummydata");

// Middleware to parse JSON requests
app.use(express.json());

// Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
})

// API Route to insert random data into the database
app.post("/add-data", async(req,res) => {
    try {
        const randomNames = ["Alice", "Bob", "Charlie", "David", "Eve"];
        const randomCities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
        const randomLanguages = ["JS", "Python", "C++", "Java", "Go"];

        const newData = new DummyData({
            name: randomNames[Math.floor(Math.random() * randomNames.length)],
            salary: Math.floor(Math.random() * 100000) + 30000,//random salary between 30,000-1,30,000
            language: randomLanguages[Math.floor(Math.random() * randomLanguages.length)],
            city: randomCities[Math.floor(Math.random() * randomCities.length)],
            isManager: Math.random() < 0.5 // 50% chance of being a manager
        });
        await newData.save();
        res.status(201).json({ success: true, message: "Data inserted successfully!", data: newData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
})
app.get('/mehul', (req, res) => {
    res.send('Mehul is just amazing!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})