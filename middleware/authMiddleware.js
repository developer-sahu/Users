import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized : Token Not Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(402).json({ message: "Unauthorized : user not found!" });

        }
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ error: "Unauthorized : Invalid Token" })
    }
}

export default authMiddleware;


