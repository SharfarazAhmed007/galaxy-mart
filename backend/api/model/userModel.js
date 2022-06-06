const mongoose = require("mongoose");
const { isEmail } = require('validator');

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
        // user_name:{
        //     type: String,
        //     require: true,
        //     trim: true,
        // },  
        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            trim: true,
            lowercase: true,
            // validate: [isEmail, 'Please enter a valid email']
        },
        password: {
            type: String,
            required: [true, 'Please enter a valid password...!'],
            minlength: [3, 'Minimum password length must be atleast 3 characters']
        },
        role: {
            type: String,
            require: true,
            enum: ["admin", "consumer", "supplier"],
            default: "consumer",
        }
    },

    {
        timestamps: true,
    }
);

const user = mongoose.model("User", userSchema);
module.exports = user;