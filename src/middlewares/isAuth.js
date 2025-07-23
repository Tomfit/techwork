const jwt = require ('jsonwebtoken');


const isAuthenticated = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader){
            return res.status (401).json ({messgae: 'Authentication failed: Authorization header missing'})

            //return errorResMsg( res, 401, 'Authentication failed: Authorization header missing');
        }
        
        const token = authHeader.split(' ')[1];
        if (!token){
            return res.status (401).json ({messgae: 'Authentication failed: Token missing'})
             //return errorResMsg( res, 401, 'Authentication failed: Token missing');
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded){

            return res.status (401).json ({messgae: 'Authentication failed: Token verification failed'})
            //return errorResMsg( res, 401, 'Authentication failed: Token verification failed');
        }

        req.user= decoded;
        next();
    }catch (error) {
    console.error("Authentication error", error);
    
    return res.status (401).json ({messgae: 'Authernication failed: Invalid Token'})
    //return errorResMsg( res, 401, 'Authentication failed: invalid Token');
  }
};

module.exports = isAuthenticated;