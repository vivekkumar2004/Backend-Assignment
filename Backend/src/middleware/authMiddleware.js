const jwt = require("jsonwebtoken");


async function identifyUser(req, res, next) {
    try {
   
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided. Please login.",
            });
        }

  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
    
        req.user = decoded; 
        
        next(); 
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token. Please login again.",
        });
    }
}


function restrictToAdmin(req, res, next) {

    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ 
            message: "Forbidden: You do not have admin privileges." 
        });
    }
    next();
}


module.exports = { identifyUser, restrictToAdmin };