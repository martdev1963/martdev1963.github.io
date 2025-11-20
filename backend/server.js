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
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD // Use App Password, not regular password
    },
    tls: {
        rejectUnauthorized: false // For development - remove in production or use proper certificates
    }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log('Email transporter error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

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

