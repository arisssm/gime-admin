const jwt = require("jsonwebtoken");

// check for session, because null and undefined is type of data
const isLogin = (req, res, next) => {
    if(req.session.user == null || req.session.user == undefined ){
        res.redirect('/login');
    } else{
        next();
    }
}
// check token
const tokenJWT = async ( req, res, next ) => {
    try{
        // if (!req.headers.authorization) {
        //     throw new Error("Authorization header is missing");
        // }
        const token = await req.headers.authorization.split(" ")[1];
        const checkToken = await jwt.verify(token, "RANDOM-TOKEN");
        const user = await checkToken;
        req.user = user;
        next();
    } catch(error){
        res.status(401).json({message: "Sorry, your token not found. You cannot access this url"});
    }
}

module.exports = {isLogin, tokenJWT};