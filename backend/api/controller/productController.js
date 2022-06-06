const productModel = require('../model/productModel');
const mongoose = require('mongoose');
//const shortid = require('shortid');
const slugify = require('slugify');

const post_items = async(req, res, next)=>{
    //res.status(200).json({file: req.files, body: req.body});

    const {name, price, description, category, supplier, countInStock} = req.body;

    let images = [];

    if(req.files.length > 0){
        images = req.files.map(file=>{
            return {img: file.filename};
        });
    }
        
    const product = new productModel({
        name: name,
        slug: slugify(name),
        price,
        description,
        images,
        category,
        supplier,
        countInStock
    });
    console.log(product);
    await product.save((error, product)=>{
        if(error) return res.status(400).json({messagesss: error.message});
        if(product){
            res.status(200).json({product});
        }
    });
};

const get_items = async(req, res, next)=>{
    const products = await productModel.find({});
    if(products){
        res.status(200).json({products: products});
    }else{
        res.status(401).json({message: "Failed request..."});
    }
};

const get_items_by_id = async(req, res, next)=>{
    const _id = req.params.id;
    const product = await productModel.findById(_id);

    if(!product){
        res.status(401).json({message: 'items not found by id...'});
        return;
    }
    res.status(200).json({
        product: product
    });
};




module.exports = {post_items, get_items, get_items_by_id};