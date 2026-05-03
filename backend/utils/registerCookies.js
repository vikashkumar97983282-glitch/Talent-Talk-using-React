const jwt = require('jsonwebtoken');

const TOKEN_COOKIE_BY_ROLE = {
    admin: 'admin_token',
    company: 'company_token',
    client: 'client_token',
};

function authMiddleware(role) {
    return function(req, res, next) {
        try{
            const cookieName = role ? TOKEN_COOKIE_BY_ROLE[role] : null;
            const token = (cookieName && req.cookies?.[cookieName]) || req.cookies?.token;

            if(!token){
                return res.status(401).send("please login your account!");
            }

            const data = jwt.verify(token, process.env.JWT_KEY);
            if(role && data?.role && data.role !== role){
                return res.status(401).send("please login your account!");
            }

            req.user = data;
            next();
        }
        catch(err){
            console.log(err);
            res.status(401).send("user not login");
        }
    };
}

function isLogin(roleOrReq, res, next){
    if(typeof roleOrReq === 'string'){
        return authMiddleware(roleOrReq);
    }

    return authMiddleware()(roleOrReq, res, next);
}

module.exports = isLogin;
module.exports.TOKEN_COOKIE_BY_ROLE = TOKEN_COOKIE_BY_ROLE;
