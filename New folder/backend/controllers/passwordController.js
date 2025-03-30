
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
import { sendPasswordResetEmail } from "../services/emailService.js";
dotenv.config();
// Passwort-Reset-Token erstellen und E-Mail senden
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Kein Benutzer mit dieser E-Mail gefunden." });
    }
    // JWT-Token erstellen (gültig für 1 Stunde)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Token und Ablaufzeit im Benutzer speichern
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 Stunde
    await user.save();
    console.log("Token nach dem Speichern:", user.resetPasswordToken);
    // E-Mail mit dem Reset-Link senden
    await sendPasswordResetEmail(email, resetToken);
    res.status(200).json({ message: "Passwort-Reset-Link wurde gesendet.",
      token: user.resetPasswordToken
     });
  } catch (error) {
    res.status(500).json({
      message: "Fehler beim Zurücksetzen des Passworts.",
      error: error.message,
    });
  }
};
// Passwort zurücksetzen mit dem Token
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    // Token verifizieren
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Benutzer anhand des Tokens und Ablaufzeit prüfen
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({success:false, message: "Ungültiger oder abgelaufener Token." });
    }
    // Passwort hashen und speichern
  //  user.password = await bcrypt.hash(newPassword, 10);
  user.password=newPassword
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
  //  console.log('user in passwordController', user)
    await user.save();
    res.status(200).json({success:true, message: "Passwort erfolgreich zurückgesetzt." });
  } catch (error) {
    console.error("Fehler beim Zurücksetzen des Passworts (resetPassword):", error.message);
    res.status(500).json({ 
      message: error.message,
      error: error.message,
    });
  }
};


















