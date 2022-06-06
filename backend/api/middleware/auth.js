const jwt = require('jsonwebtoken');
const cookie_parser = require('cookie-parser');
const dotnev = require("dotenv").config();
const auth = (req, res, next)=>{

    const { authorization } = req.headers;

    try{
        const token = authorization.split(' ')[1] || req.cookies.access_token;
        
        //const token = req.cookies.access_token;
        //console.log(token);

        if(!token){
            return res.status(403).json({messagess :'token not found'});
        }

        
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY,(err, decode)=>{
            if(err){
                res.status(401).json({messageinAuth: err});
             }
            else{
                console.log(decode);
                // req.user_name = decode.user_name;
                req.email = decode.email;
                req.user_id = decode.user_id;
            }
        });
        


        next();
    }catch(err){
        console.log("error+", err);
        next('Authentication Failure!!');
    }
};

module.exports = auth;