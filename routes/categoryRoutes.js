const express = require('express');
const Category = require('../components/category');
const CategoryRepository = require('../repositories/categoryRepository');

const router = express.Router();
const categoryRepository = new CategoryRepository();

router.get('/', async (req, res) => {
    try {
        const categories = await categoryRepository.getAll();
        res.status(200).json(categories)
    } catch (exception) {
        res.status(500).json({message : exception.message})
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    const newCategory = new Category(name);
    try {
      const newCategoryId = await categoryRepository.save(newCategory);
      res.status(201).json({ id: newCategoryId });
    } catch (exception) {
      res.status(500).json({ message: exception.message });
    }
  });

module.exports = router;