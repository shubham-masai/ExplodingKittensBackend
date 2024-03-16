const jwt = require("jsonwebtoken");
require('dotenv').config()
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        if (!token) {
            return res.status(401).send({ error: "Authorization token is missing" });
        }
        
        jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).send({ error: 'Failed to authenticate token' });
            }
            req.body.username = decoded.username;
            req.userId = decoded.userId;

            next();
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = auth;
