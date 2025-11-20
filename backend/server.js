const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD // Use App Password, not regular password
    },
    tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000
});

// Verify transporter configuration (with retry logic for Render)
let verificationAttempts = 0;
const maxVerificationAttempts = 3;

function verifyTransporter() {
    transporter.verify(function(error, success) {
        if (error) {
            verificationAttempts++;
            console.log(`Email transporter verification attempt ${verificationAttempts}:`, error.message);
            if (verificationAttempts < maxVerificationAttempts) {
                // Retry after 5 seconds
                setTimeout(verifyTransporter, 5000);
            } else {
                console.log('Email transporter verification failed after multiple attempts. Emails may not work.');
                console.log('This is often a temporary network issue on Render. The server will continue running.');
            }
        } else {
            console.log('✅ Email server is ready to send messages');
        }
    });
}

// Start verification (with delay on Render to allow network to stabilize)
setTimeout(verifyTransporter, 2000);

// Form submission endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                error: 'All fields are required' 
            });
        }

        // Email content
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Send to your own Gmail
            replyTo: email, // Allow replying directly to the sender
            subject: `Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><small>This email was sent from your contact form.</small></p>
            `,
            text: `
                New Contact Form Submission
                
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent:', info.messageId);
        
        res.status(200).json({ 
            success: true, 
            message: 'Your message has been sent successfully!' 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        console.error('Error details:', error.message);
        console.error('Error code:', error.code);
        
        // Return more detailed error for debugging (remove in production)
        res.status(500).json({ 
            success: false, 
            error: 'Failed to send message. Please try again later.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Contact Form Backend API',
        endpoints: {
            health: '/api/health',
            contact: '/api/contact (POST)'
        },
        status: 'running'
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Contact form endpoint: http://localhost:${PORT}/api/contact`);
});

