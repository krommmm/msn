const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.authTokenMsn;
        if (!token) return res.status(401).json({ msg: "Non autorisé" });
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;
        const isAdmin = decodedToken.isAdmin;
        const isConnected = decodedToken.isConnected;

        req.auth = {
            userId: userId,
            isAdmin: isAdmin,
            isConnected: isConnected
        }
        next();

    } catch (err) {
        res.clearCookie('authTokenMsn', token, {
            httpOnly: true,
            secure: 'production',
            sameSite: 'None',
            partitioned: true,
            path: "/"
        });
        return res.status(400).json({ msg: "Erreur auth", error: err })
    }
};