import nodemailer from 'nodemailer';
import { email } from '../config.js';
import { log, error } from '../logger.js';

const transporter = nodemailer.createTransport({
    service: email.service,
    auth: { user: email.user, pass: email.pass }
});

export function sendEmail(subject, text) {
    transporter.sendMail({ from: email.user, to: email.to, subject, text }, (err, info) => {
        if (err) error('Email error:', err);
        else log('Email sent:', info.response);
    });
}
