import { Router } from "express";
import nodemailer from "nodemailer"
import { Issue } from "../models/Issue.js";
import dotenv from 'dotenv'
dotenv.config()

export const contactRouter = Router()

const user = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASS

contactRouter.post("/", async (req, res) => {
    const transmitter = nodemailer.createTransport({
        service: "gmail",
        auth: {
             user: user,
             pass: pass,
        //    user: 'eisianni067@gmail.com',
        //    pass: "wffy colk vufz ixsh"
        }
    })
    try {
        const newIssue = new Issue(req.body);
        await newIssue.save();

        const infoMail = {
        //    from: "eisianni067@gmail.com",
        //    to: "eisianni067@gmail.com",
             from: user,
             to: user,
            subject: "Neuer Eintrag über das Kontaktformular",
            text: `Neue Nachricht von ${newIssue.name}: \n${newIssue.email}\n${newIssue.message}`
        }

        await transmitter.sendMail(infoMail, (err, info) => {
            if (err) {
                console.error('Fehler beim Senden:', err);
                res.status(500).send('Fehler beim Senden der Mail');
            } else {
                console.log('E-Mail gesendet:', info.response);
                res.status(200).send('Mail erfolgreich gesendet');
            }
        }
        )

        res.json({ message: "Deine Nachricht wurde an uns gesendet! Wir melden uns sobald wie möglich bei dir :)" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fehler beim Senden der Nachricht." });
    }
});
