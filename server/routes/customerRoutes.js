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

router.get('/search', async (req, res) => {
  let searchValue = req.query.search;
  try {
    var regex = new RegExp(searchValue, 'g');
    let searchCustomerResult = await CustomerModel.find({
      $or: [
        { name: { $regex: regex } },
        { phone_number: { $regex: regex } },
        { address: { $regex: regex } },
        { product_names: { $regex: regex } },
        { prices: { $regex: regex } },
        { total_price: { $regex: regex } },
      ],
    });
    res.json(searchCustomerResult);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete('/delete', async (req, res) => {
  let customerId = req.body.id;
  try {
    let deleteCustomerResult = await CustomerModel.remove({ _id: customerId });
    res.json(deleteCustomerResult);
  } catch (error) {
    res.json({ message: error });
  }
});

router.put('/:id', async (req, res) => {
  let customerId = req.params.id;
  try {
    let findOneCustomerResult = await CustomerModel.findOne({
      _id: customerId,
    });
    if (!findOneCustomerResult) {
      throw 'sdf';
    }
    let updateCustomerResult = await CustomerModel.updateOne(
      { _id: customerId },
      {
        $set: {
          name: req.body.name ?? findOneCustomerResult.name,
          phone_number:
            req.body.phone_number ?? findOneCustomerResult.phone_number,
          address: req.body.address ?? findOneCustomerResult.address,
          product_names:
            req.body.product_names ?? findOneCustomerResult.product_names,
          prices: req.body.prices ?? findOneCustomerResult.prices,
          total_price:
            req.body.total_price ?? findOneCustomerResult.total_price,
        },
      }
    );
    res.json(updateCustomerResult);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
