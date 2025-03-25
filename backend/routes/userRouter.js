

import express from 'express';
import passport from 'passport';
import { authMiddleware } from '../middleware/auth.js';  // Middleware mit Cookies
import { googleAuthCallback } from "../controllers/googleAuthController.js";
import "../services/googleAuthService.js"; // Lade Passport-Strategie
import {
    register,
    login,
    logout,
    dashboard
} from '../controllers/authController.js';
import { getMe } from '../controllers/authControllerMe.js'

import { requestPasswordReset, resetPassword } from "../controllers/passwordController.js";


const router = express.Router();


router.post('/register', register);
router.post('/login', login);

//PASSWORD RESET
router.post('/forgot-password', requestPasswordReset);
router.post('/password-reset/:token', resetPassword);

//  LOGOUT (Cookie löschen) 
router.post('/logout', logout); // Cookies löschen im Controller

//  Google-Login starten
router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
//  Google-Callback verarbeiten
router.get("/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false // Wenn du keine Express-Session nutzt
    }),
    googleAuthCallback // Hier wird das JWT-Token erstellt und der User eingeloggt
);

router.get('/me', authMiddleware, getMe)

router.get('/dashboard', authMiddleware, dashboard); // Token wird aus dem Cookie gelesen

export const userRouter = router;


