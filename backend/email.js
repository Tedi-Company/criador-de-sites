const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function sendEmail(to, subject, text) {
    const mailOptions = { from: process.env.EMAIL_USER, to, subject, text };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error('Erro enviando e-mail:', err);
        else console.log('E-mail enviado:', info.response);
    });
}

module.exports = { sendEmail };
