const express = require('express');
const Product = require('../components/product');
const ProductRepository = require('../repositories/productRepository');

const router = express.Router();
const productRepository = new ProductRepository();

router.get('/', async (req, res) => {
    try {
        const products = await productRepository.getAll();
        res.status(200).json(products)
    } catch (exception) {
        res.status(500).json({message : exception.message})
    }
});

router.post('/', async (req, res) => {
    const { name, price, category_id } = req.body;
    const newProduct = new Product(name, price, category_id);
    try {
      const newProductId = await productRepository.save(newProduct);
      res.status(201).json({ id: newProductId });
    } catch (exception) {
      res.status(500).json({ message: exception.message });
    }
  });

module.exports = router;