import Advertiser from "../models/Advertiser.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport';



export const login = (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ error: `יש צורך במייל וסיסמה!` })
    }

    Advertiser.find()
        .where({ email: { $eq: email } })
        .then(async advertisers => {
            if (advertisers.length == 0) {
                return res.status(404).send({ error: `האימייל והסיסמה אינם תואמים!` })
            }

            let [advertiser] = advertisers

            if (advertiser.password !== password) {
                return res.status(404).send({ error: `האימייל והסיסמה אינם תואמים!` })
            }

            const token = await jwt.sign(
                { email },
                process.env.SECRET,
                // {
                //     expiresIn: '1hr' 
                // }
            )

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'y5861142@gmail.com',
                    pass: 'tzru scti vozr jgdb'
                }
            
            });
            let mailOptions = {
                from: 'y5861142@gmail.com',
                to: advertiser.email,
                subject: 'התחברת בהצלחה !',
                html: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Web Page</title><style>body {font-family: Arial, sans-serif;background-color: #f4f4f4;color: #333;margin: 0;padding: 20px;}h1 {color: #4CAF50;}p {line-height: 1.6;}.container {max-width: 800px;margin: auto;background: white;padding: 20px;border-radius: 5px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);}</style></head><body><div class="container"><h1>שמחים לראותך איתנו באתר הגדול בארץ לדירות נופש חלומיות...</h1><p>באפשרותך לפרסם את דירתך ולזכות לתפוצה עולמית, ח-י-נ-ם!!</p></div></body></html>'};
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('מייל נשלח: ' + info.response);
                }
            });


            res.status(200).send({ advertiser, token })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const register = (req, res) => {

    const { email, password, phone, otherPhone } = req.body

    Advertiser.find()
        .where({ email: { $eq: email } })
        .then(advertiser => {
            if (advertiser.length > 0) {
                return res.status(400).send({ error: 'האימייל כבר קיים!' })
            }
            const newAdvertiser = new Advertiser({
                email,
                password,
                phone,
                otherPhone
            })

            newAdvertiser.save()
                .then(async advertiser => {
                    const token = await jwt.sign(
                        { email },
                        process.env.SECRET,
                        // {
                        //     expiresIn: '1hr'
                        // }
                    )
                    return res.status(200).send({ advertiser, token })
                })
                .catch(err => {
                    return res.status(500).send({ error: err.message })
                })
        })
}