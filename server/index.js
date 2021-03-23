const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const customerRoutes = require('./routes/customerRoutes');
const bodyParser = require('body-parser');
var cors = require('cors');

const port = process.env.PORT || 3001;
//Middleware
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
//Import routes
app.use('/customers', customerRoutes);
app.get('/', (req, res) => {
  res.send('Hello world');
});
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
