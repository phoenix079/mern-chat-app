const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./dataB.cjs");
const router = require("./userRouters.cjs");

dotenv.config();
const app=express();
connectDB();




app.get('/',(req,res)=>{
    res.send("API is running successfully")
})

app.use(express.json());
app.use('/api/user',router);

const PORT=process.env.port || 5000

app.listen(5000,console.log(`Server started on port ${PORT}`));