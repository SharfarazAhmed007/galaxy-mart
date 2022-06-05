const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
//const config = require('config');
const bcrypt = require('bcryptjs');

const signup = async(req, res, next)=>{
    const { name, user_name, email, password, role } = req.body;

    if(!name || !user_name || !email || !password || !role){
        res.status(400).json({
            message: 'Please enter all fields!!',
        });
    }

    const _user = await userModel.findOne({email: req.body.email});
    
    console.log(_user);

    if(_user){
        return res.status(400).json({ messsage: 'User already exists.....!'});
    }
  
    if(!_user){
        try{
            const hashed_password = await bcrypt.hash(req.body.password, 10);
        
            const user = new userModel({
                name: req.body.name,
                user_name: req.body.user_name,
                email: req.body.email,
                password: hashed_password,
                role: req.body.role
            }); 
            await user.save();

            res.status(200).json({
                message: 'Sign-up was  Successful !'
            });

        } catch(err){
            res.status(500).json({
                message: 'Sign-up failed !',
                error: err
            });
        }
    }
};

const login = async (req, res, next)=>{

    try {
        const user = await userModel.find({email: req.body.email});
        console.log(user.password);
        if(user && user.length > 0){
            const is_valid_password = await bcrypt.compare(req.body.password, user[0].password);
            //console.log(is_valid_password);
            // console.log('');
            // console.log(user);
            if(is_valid_password){
                const token = jwt.sign({
                    user_name: user[0].user_name,
                    email: user[0].email,
                    user_id: user[0]._id
                }, process.env.JWT_PRIVATE_KEY, {expiresIn: '1h'});

            res.status(200).json({
                token: token,
                message: 'Login Successful'
            });

            }else{
                res.status(401).json({
                    error: 'Authentication failed!'
                });
            }

        }else{
            res.status(401).json({
                error: 'Authentication failed!'
            });
        }
    }catch(e){
        res.status(401).json({
            error: 'Authentication failed!'
        });   
    }
};

const update_user = async(req, res, next)=>{

    try{
        const user_id = req.user_id;
        const user = await userModel.findById(user_id);
        const hashed_password = await bcrypt.hash(req.body.password, 10);
        console.log(user.user_name);
        console.log(user._id);
        if(user){
            user.name = req.body.name || user.name;
            user.user_name = req.body.user_name || user.user_name;
            user.email = req.body.email || user.email;
            user.password = hashed_password || user.password;
            await user.save();
            
            const token = jwt.sign({
                user_name: user.user_name,
                email: user.email,
                user_id: user._id
            }, process.env.JWT_PRIVATE_KEY, {expiresIn: '1h'});

            res.status(200).json({
                token: token,
                message:"Profile Updated!!"
            });
        }else{
            res.status(401).json({
                error: 'Authentication failed!'
            });   
        }
        console.log(user);
    }catch(err){
        //next("Authentication Failed. Login Again!!");
        console.log("Error"+ err);
    }
};

module.exports = {signup, login, update_user};

