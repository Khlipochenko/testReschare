import dotenv from 'dotenv';
import {
  registerUser,
  loginUser,
  requestPasswordReset as forgotPasswordService,
  updatePasswordWithToken as resetPasswordService
} from '../services/authService.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
dotenv.config();
// REGISTER
export const register = async (req, res) => {
  try {
    const { user } = await registerUser(req.body);
    res.status(201).json({ user });
  } catch (err) {
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0].message;
      console.log(firstError)
      return res.status(400).json({ message: firstError });
    }
    res.status(400).json({ message: err.message });
  }
};
// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    // Token im Cookie setzen (nur bei Login)
    res.cookie('token', token, {
      httpOnly: true,
      //secure: false,
      secure: true,
      sameSite: 'None',
      maxAge: 3600000
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const resetToken = await forgotPasswordService(req.body.email);
    res.json({ resetToken });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const user = await resetPasswordService(req.body.token, req.body.newPassword);
    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//  LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }); // Token-Cookie löschen
    res.end()
   // res.clearCookie('token'); // Token-Cookie löschen
   // res.status(200).json({ message: 'Logout erfolgreich' });
  } catch (err) {
    res.status(500).json({ message: 'Logout fehlgeschlagen', error: err.message });
  }
};
//DASHBOARD
export const dashboard = async (req, res) => {
  try {
    //console.log('Cookies received:', req.cookies); // Log all cookies
    //console.log('Token received:', req.cookies.token);
    //console.log('Cookies received:', req.cookies);
    const token = req.cookies.token; // Token aus Cookie lesen
    if (!token) return res.status(401).json({ message: 'Nicht autorisiert' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    res.status(200).json({ message: `Willkommen bei reshare, User ID: ${decoded.userId}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Fehler beim Laden des Dashboards', error: err.message });
  }
};
