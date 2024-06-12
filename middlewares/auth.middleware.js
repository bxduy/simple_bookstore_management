import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    // Tokken not found
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    // Verify token
    jwt.verify(token, "SECRET", (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};