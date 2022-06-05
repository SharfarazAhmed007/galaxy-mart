const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{

    const { authorization } = req.headers;

    try{
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        const{ user_name, email, user_id} = decoded;

        req.user_name = user_name;
        req.email = email;
        req.user_id = user_id;

        next();
    }catch(err){
        next('Authentication Failure!!');
    }
};

module.exports = auth;