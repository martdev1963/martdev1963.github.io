require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // For development
    }
});

console.log('Testing Gmail connection...');
console.log('Gmail User:', process.env.GMAIL_USER);
console.log('App Password length:', process.env.GMAIL_APP_PASSWORD ? process.env.GMAIL_APP_PASSWORD.length : 'Not set');

transporter.verify(function(error, success) {
    if (error) {
        console.error('❌ Connection failed:', error.message);
        console.error('Error code:', error.code);
        if (error.code === 'EAUTH') {
            console.error('\n⚠️  Authentication failed. Please check:');
            console.error('1. Is 2-Step Verification enabled on your Google Account?');
            console.error('2. Did you use an App Password (not your regular password)?');
            console.error('3. Is the App Password correct? (16 characters, no spaces)');
            console.error('4. Try generating a new App Password at: https://myaccount.google.com/apppasswords');
        }
    } else {
        console.log('✅ Gmail connection successful!');
        console.log('Server is ready to send emails.');
    }
});

