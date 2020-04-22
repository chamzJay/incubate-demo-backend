const express = require("express");
const Product = require("../models/product");
const router = new express.Router();

//register
router.post("/api/product", async (req, res) => {
  let body = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    seller: req.body.seller,
  };

  let product = Product(body);

  try {
    await product.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

//retrieve all products
router.get("/api/product/all", async (req, res) => {
  let skip = req.query.skip;
  try {
    let products = await Product.find()
      .skip(parseInt(skip))
      .limit(10)
      .populate({
        path: "seller",
        model: "User",
        select: { username: 1, _id: 0 },
      })
      .exec();
    count = await Product.countDocuments();
    res.status(200).send({ products, count });
  } catch (error) {
    res.status(400).send(error.toString());
  }
});

module.exports = router;
