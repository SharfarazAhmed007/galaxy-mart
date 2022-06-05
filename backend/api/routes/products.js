const express = require('express');
const router = express.Router();

const productController = require('../controller/productController');

router.get('/', productController.get_items);
router.post('/', productController.post_items);
router.put('/:id', productController.update_items);
router.delete('/:id', productController.delete_items);

module.exports = router;
