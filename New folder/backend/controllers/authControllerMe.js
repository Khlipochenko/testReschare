import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getMe = async (req, res) => {
    try {
        //     console.log("Cookies received:", req.cookies);


        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //  console.log("Decoded Token:", decoded);


        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        res.status(200).json({ user });


    } catch (error) {
        console.error("Auth error:", error.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

