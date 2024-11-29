const dotenv=require('dotenv').config()
const express= require("express")
const connectDB=require('./config/connectDB');
const mongoose=require('mongoose');
const Task = require('./model/taskModel');
const taskRoutes=require('./routes/taskRoute')
const cors=require('cors')
const app=express()

//middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());
app.use("/api/tasks",taskRoutes);
// app.use(cors()); always place above the api
// const logger=(req,res,next)=>{
//     console.log('home page')
//     console.log(req.method);
    
//     next()
// }


//Route
app.get("/",(req,res)=>{
    res.send("Home Page");

})




const PORT=process.env.PORT || 5000

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running port :${PORT}`);
    });
})
.catch((err)=>{
    console.log(err);
})


