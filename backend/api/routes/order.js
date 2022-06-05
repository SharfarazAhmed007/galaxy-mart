const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');



router.get('/', orderController.getOrder);
router.post('/:orderId', orderController.postOrder);
router.delete('/:orderId', orderController.deleteOrder);
router.patch('/:orderId', orderController.updateOrder);

module.exports = router;
