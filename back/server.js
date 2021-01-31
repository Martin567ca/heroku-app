const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors')
const PORT = proccess.env.PORT || 4000;
const path = require('path');

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, ()=>console.log("Database connected"))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../front/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(_dirname,'client','build','index.html'));
    })
}

app.use(express.json())
app.use(cors())
app.use('/app',routesUrls)
app.listen(PORT,()=> console.log("server is running"))