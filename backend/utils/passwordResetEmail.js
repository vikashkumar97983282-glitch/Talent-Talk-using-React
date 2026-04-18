async function sendPasswordResetEmail({ to, name, code, accountType }) {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const mailFrom = process.env.MAIL_FROM || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass || !mailFrom) {
        console.log(
            `[Password Reset] SMTP is not configured. ${accountType} email=${to}, code=${code}`
        );
        return { delivered: false, mode: 'console' };
    }

    let nodemailer;
    try {
        nodemailer = require('nodemailer');
    } catch (err) {
        console.log('[Password Reset] nodemailer is not installed.', err);
        return { delivered: false, mode: 'console' };
    }

    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
    });

    const safeName = name || 'User';
    const subject = 'Your Talent Talk Password Reset Code';
    const text = `Hello ${safeName}, your ${accountType} password reset code is ${code}. This code expires in 10 minutes.`;
    const html = `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
            <h2 style="margin-bottom:8px;">Password Reset Verification</h2>
            <p>Hello ${safeName},</p>
            <p>Your <strong>${accountType}</strong> password reset verification code is:</p>
            <p style="font-size:24px;font-weight:bold;letter-spacing:2px;">${code}</p>
            <p>This code expires in <strong>10 minutes</strong>.</p>
        </div>
    `;

    await transporter.sendMail({
        from: mailFrom,
        to,
        subject,
        text,
        html,
    });

    return { delivered: true, mode: 'smtp' };
}

module.exports = sendPasswordResetEmail;
