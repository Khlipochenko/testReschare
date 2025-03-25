import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createToken } from '../utils/jwt.js';
export const registerUser = async (userData) => {
  const { email, password, username } = userData;
  // Überprüfen, ob der Benutzer bereits existiert
  const existingUser = await User.findOne({ email });
  if (existingUser){
    throw new Error('Benutzer existiert bereits.');}
  // Passwort hashen
 // const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    email,
    password: password,
    username
  });
  await user.save();
  const token = createToken({ userId: user._id });
  return { user, token };
};
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  console.log('Benutzer in DB gefunden:', user);
  if (!user) {
    console.log('Kein Benutzer mit dieser E-Mail gefunden.');
    throw new Error('Ungültige E-Mail oder Passwort');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log('Passwortvergleich:', isMatch);
  if (!isMatch) {
    console.log('Falsches Passwort eingegeben.');
    throw new Error('Ungültige E-Mail oder Passwort');
  }
  const token = createToken({ userId: user._id });
  console.log('Login erfolgreich, Token erstellt:', token);
  return { user, token };
};
export const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  // Erstelle und sende das Reset-Token hier
  return 'reset-token'; // Temporär
};
export const updatePasswordWithToken = async (token, newPassword) => {
  // Finde den Benutzer anhand des Tokens (hier simuliert)
  const user = await User.findOne({ email: 'user@example.com' });
  if (!user) throw new Error('Invalid token');
  // Passwort hashen
 // const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = newPassword;
 // console.log('user in AuthServise',user)
  await user.save();
  return user;
};
