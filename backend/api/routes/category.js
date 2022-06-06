const express = require('express');
const categoryController = require('../controller/categoryController');
const router = express.Router();
//const auth = require('../middleware/auth');

router.get('/category', categoryController.getCategories);
router.post('/category', categoryController.createCategory);
router.put('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;