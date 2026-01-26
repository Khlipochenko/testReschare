import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema (
  {
    username: {
      type: String,
      required: [true, 'Der Benutzername ist erforderlich'],
      trim: true,
      minlength: [3, 'Der Benutzername muss mindestens 3 Zeichen lang sein'],
      maxlength: [30, 'Der Benutzername darf maximal 20 Zeichen lang sein'],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9 _.-]+$/.test(value);
        },
        message: 'Der Benutzername darf nur Buchstaben, Zahlen, Punkte, Unterstriche und Bindestriche enthalten'
      }
    },
    email: {
      type: String,
      required: [true, 'Die E-Mail ist erforderlich'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Bitte eine gültige E-Mail-Adresse eingeben']
    },
    password: {
      type: String,   
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value, {
            minLength: 8,
            minSymbols: 1,
            minNumbers: 1,
            minUppercase: 1,
            minLowercase: 1
          });
        },
        message:  'Das Passwort muss mindestens 8 Zeichen lang sein und mindestens 1 Sonderzeichen, 1 Großbuchstaben und 1 Zahl enthalten'
        
      }
    },
    itemsId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'item'
      }
    ],



    googleId: {
      type: String,
      unique: true,
      sparse: true // Damit es für normale Nutzer ohne GoogleId funktioniert
    },

    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },


    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);


// // Middleware zum Hashen des Passworts, falls es geändert oder neu gesetzt wird
// userSchema.pre('save', async function (next) {
//   // Hash das Passwort nur, wenn es neu ist oder geändert wurde
//   if (!this.isModified('password')) return next();
//   // Hash das Passwort nur, wenn es noch nicht gehasht ist
//   if (!this.password.startsWith('$2b$')) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     console.log(' Passwort gehasht:', this.password);
//   }
//   next();
// });

userSchema.pre('save',  function(next){
  if (this.isModified('password')) {
  const salt=  bcrypt.genSaltSync(10)
  this.password=  bcrypt.hashSync(this.password, salt)}
  next()
})


// Methode zum Vergleichen von Passwörtern
userSchema.methods.comparePassword = async function (eingegebenesPasswort) {
  console.log(' Vergleich gestartet:');
  console.log(' Eingegebenes Passwort:', eingegebenesPasswort);
  console.log(' Gespeichertes Passwort:', this.password);
  const isMatch = await bcrypt.compare(eingegebenesPasswort, this.password);
  console.log(':Passwortvergleich erfolgreich:', isMatch);
  return isMatch;
};

const User = mongoose.model("User", userSchema);
export default User;
















