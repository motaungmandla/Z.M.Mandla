const fs = require('fs');
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, phone, message } = req.body;
        
        // Save data to a text file
        fs.appendFileSync('data.txt', `Name: ${name}, Email: ${email}, Phone: ${phone}, Message: ${message}\n`);

        // Send notification email to you
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // Use TLS
            auth: {
                user: 'zmmandla24@gmail.com',
                pass: 'YOUR_APP_PASSWORD' // Replace with a secure App Password
            }
                });


        let mailOptions = {
            from: 'zmmandla24@gmail.com',
            to: 'your-email@gmail.com',
            subject: 'New Form Submission',
            text: `You have a new form submission:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
        };

        try {
            await transporter.sendMail(mailOptions);
            await transporter.sendMail(autoReplyOptions);
            res.status(200).json({ message: 'Form submitted successfully' });
        } catch (error) {
            console.error('Email Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
}


        // Send automatic response to the user
        let autoReplyOptions = {
            from: 'zmmandla24@gmail.com',
            to: email,
            subject: 'Motaunginc Response',
            text: 'Thank you for reaching out! Motaunginc responds between 3-5 work days.'
        };

        await transporter.sendMail(autoReplyOptions);

        res.status(200).json({ message: 'Form submitted successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
