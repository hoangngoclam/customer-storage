const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const customerRoutes = require('./routes/customerRoutes');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
//Middleware
app.use(bodyParser.json());

//Import routes
app.use('/customers', customerRoutes);

mongoose.connect(
  'mongodb+srv://hoangngoclam:L%40m123123@cluster0.wsww8.mongodb.net/customer-storage?retryWrites=true&w=majority',
  { useNewUrlParser: true },
  () => {
    console.log('Connect sucess!');
  }
);
app.listen(port, () => {
  console.log(`Server listen on port: ${port}`);
});
