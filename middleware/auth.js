import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Auth header:", authHeader);
        
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
        if (!token) {
            return res.status(401).json({ message: "Token not found in Authorization header" });
        }

        const decoded = jwt.verify(token, "abc"); // Ensure the secret matches the one used in login
        req.user = decoded; // Attach user details to request object
        console.log("Decoded Token Data:", decoded); // Debugging: Check what is inside the token
        next();
    } catch (e) {
        res.status(401).json({ message: "Invalid or expired token", error: e.message });
        console.log("Token verification failed:", e.message);
    }
};

export default verifyToken;
