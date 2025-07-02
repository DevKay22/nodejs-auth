const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    

    const authHeader = req.headers['authorization'];
    // console.log(authHeader)
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success: false,
            message : 'Access denied! please login'
        })
    }

    //decode this token 
    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedTokenInfo);

        req.userInfo = decodedTokenInfo;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message: "Something went wrong, access denied!"
        })

    }

    
}

module.exports = authMiddleware