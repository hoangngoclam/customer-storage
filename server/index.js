const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const customerRoutes = require('./routes/customerRoutes');
const bodyParser = require('body-parser');

//Middleware
app.use(bodyParser.json());

//Import routes
app.use('/customers', customerRoutes);

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true},()=>{
  console.log("Connect sucess!")
})
app.listen(3000);
