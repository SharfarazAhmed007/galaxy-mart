const orderModel = require('../model/orderModel');


const postOrder = (req, res, next)=>{
    res.status(201).json({
        message: 'Order created Successfully',
        id: req.params.orderId
    });
};

const getOrder = (req, res, next)=>{
    res.status(201).json({
        message: 'handling get request to orders',
        id: req.params.orderId
    });
};

const deleteOrder = (req, res, next)=>{
    res.status(201).json({
        message: 'order deleted successfully',
        id: req.params.orderId
    });
};

const updateOrder = (req, res, next)=>{
    res.status(201).json({
        message: 'order updated Successfully',
        id: req.params.productId
    }); 
};

module.exports = {postOrder, getOrder, updateOrder, deleteOrder};