import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${process.env.ORIGIN}/password-reset/${token}`;
  // Debugging: Token und Link anzeigen
  console.log("Reset-Token, der gesendet wird:", token);
  console.log("Reset-Link, der gesendet wird:", resetLink);
  try {
      await transporter.sendMail({
          from: `"Reshare Team" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Passwort zurücksetzen",
          html: `
              <h2>Passwort zurücksetzen</h2>
              <p>Klicke auf den folgenden Link, um dein Passwort zurückzusetzen:</p>
              <a href="${resetLink}">${resetLink}</a>
              <p>Falls du das nicht angefordert hast, ignoriere diese Nachricht.</p>
          `,
      });
      console.log("Passwort-Reset-E-Mail gesendet an:", email);
  } catch (error) {
      console.error("Fehler beim Senden der E-Mail:", error);
      throw new Error("E-Mail konnte nicht gesendet werden.");
  }
};










