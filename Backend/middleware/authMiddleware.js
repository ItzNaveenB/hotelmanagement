const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
        console.log("token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

exports.checkAdminRole = (req, res, next) => {
    console.log("Req.user: ", req.user);
    const user = req.user;
    console.log(user)
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized: Admin role required' });
    }
    next();
};

