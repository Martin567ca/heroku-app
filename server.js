const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors')
const PORT = process.env.PORT || 4000;
const path = require('path');

dotenv.config()

mongoose.connect(process.env.MONGODB_URI ||process.env.DATABASE_ACCESS, ()=>console.log("Database connected"))




app.use(express.json())
app.use(cors())
app.use('/app',routesUrls)
app.listen(PORT,()=> console.log("server is running at port:"+PORT))