const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const PORT = process.env.PORT;
const path = require('path');

// Our main server file where all the middleware is used and where connections are made


dotenv.config()

// Database connection

mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_ACCESS, ()=>console.log("Database connected"))

// We use this function to render the build of the application when using heroku in a production stage

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'../','build','index.html'));
    })
}



app.use(express.json())
app.use('/app',routesUrls)
app.listen(PORT,()=> console.log("server is running at port:"+PORT))