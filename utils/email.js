import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '@gmail.com',
        pass: ''
    }
});

export const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: '@gmail.com',
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};