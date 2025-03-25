
import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
    // Token aus Cookie statt aus Header lesen
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = verifyToken(token); // Token validieren
        req.user = decoded; // User-Daten an die Anfrage anhängen
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
