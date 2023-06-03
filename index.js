const express=require('express');
const { connection } = require('./config/db');
const{userrouter}=require("./routes/userroute");
const {postrouter}=require("./routes/postroute")
const cors=require('cors')


const app=express();

require('dotenv').config();

app.use(cors({
    origin:"*"
}))

app.use(express.json());




app.get("/",(req,res)=>{
    res.json("welcome")
})

app.use("/users",userrouter);
app.use("/posts",postrouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`server is running on port ${process.env.port}`)
    } catch (error) {
        console.log(error);
        console.log('Error While Connecting To Database')
    }
})





