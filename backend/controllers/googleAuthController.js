import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const googleAuthCallback = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Nicht autorisiert" });
    }

   // console.log('req.user.,',req.user.user._id)
    // JWT-Token erstellen
    const token = jwt.sign(
        { userId: req.user.user._id.toString() }, // Benutzer-ID in das Token speichern
        process.env.JWT_SECRET,
        { expiresIn: "1h" } 
    );
   //Token im Cookie speichern
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 3600000, 
    });
    if (req.headers.accept.includes('application/json')) {
  res.status(200).json({ success: true, user: req.user });
} else {
  res.redirect(process.env.ORIGIN);
}
    //res.redirect(process.env.ORIGIN);
    
};







  
  
  
  










