// check for session, because null and undefined is type of data
const isLogin = (req, res, next) => {
    if(req.session.user == null || req.session.user == undefined ){
        res.redirect('/login');
    } else{
        next();
    }
}

module.exports = {isLogin};