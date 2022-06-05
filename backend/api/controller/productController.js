const productModel = require('../model/productModel');
const mongoose = require('mongoose');


// const getProductById = (req, res, next)=>{
    // const id = req.params.productId;
    // productModel.findById(id).exec().then(doc=>{
        // console.log("from Database", doc);
    //    if(doc){
            // res.status(200).json(doc);
    //    }else{
        //    res.status(404).json({
            //    message: "no valid entry found for the provided ID"
        //    });
    //    } 
    // })
    // .catch(err=>{
        // console.log(err);
        // res.status(500).json({error: err});
    // });
// };

const get_items = (req, res, next)=>{
    // productModel.find().exec().then(docs=>{
        // console.log("from Database", docs);
    //    if(docs){
            // res.status(200).json(docs);
    //    }else{
        //    res.status(404).json({
            //    message: "no valid entry found for the provided ID"
        //    });
    //    } 
    // })
    // .catch(err=>{
        // console.log(err);
        // res.status(500).json({error: err});
    // });

    productModel.find().sort({date:-1}).then(items =>{
        res.json(items);
    });
};





//uploading a product
const post_items = (req, res, next)=>{
    
    const product = new productModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        
    });
    product.save()
           .then(result=>{
               console.log("from database",result);
               res.status(200).json({
                message: 'handling POST requests to /products....',
                product: product
            });
           })
           .catch(err=>{
               console.log(err);
               res.status(500).json({error: err});
           });
};

const update_items = (req, res, next)=>{
    const id = req.params.productId;
    
    productModel.findOneAndUpdate({_id: id}, {}).exec().then(doc=>{
        console.log("from database",doc);
    })
    .catch(err=>{
        console.log("Error: ", err);
    });


    res.status(201).json({
        message: 'updated product successfully',
        id: req.params.productId
    });
};

const delete_items = (req, res, next)=>{
    const id = req.params.productId;
    productModel.deleteOne({_id: id}).exec()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: err});
    }); 
};

module.exports = {update_items, delete_items, get_items, post_items};