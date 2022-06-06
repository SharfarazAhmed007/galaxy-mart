const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        slug:{
            type: String,
            required: true,
        },
        images:[
            {
                img:{
                    type: String,
                    required: true,
                }
            }
        ],
        price:{
            type: Number,
            trim: true,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        countInStock:{
            type: Number,
            required: true
        },
        supplier:{
            type: String,
            required: true
        },
        rating:{
            type: String,
        },
        description:{
            type: String,
            required: true
        },
    },
    {
        timestamps: true 
    },
);

module.exports = mongoose.model("Products", productSchema);