const express = require('express');
const router = express.Router();
const CustomerModel = require('../models/Customer');
router.get('/', async (req, res) => {
  try {
    let customers = await CustomerModel.find();
    res.send(customers);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  console.log(req.body);
  const customer = new CustomerModel({
    name: req.body.name,
    phone_number: req.body.phone_number,
    address: req.body.address,
    product_names: req.body.product_names,
    prices: req.body.prices,
    total_price: req.body.total_price,
  });
  try {
    let addNewCustomerResult = await customer.save();
    res.json(addNewCustomerResult);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
