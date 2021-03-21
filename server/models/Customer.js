const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phone_number: {
    type: String,
    Request: true,
  },
  address: {
    type: String,
  },
  product_names: {
    type: String,
  },
  prices: {
    type: String,
  },
  total_price: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Customer', CustomerSchema);
