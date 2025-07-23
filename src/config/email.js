const nodemailer = require('nodemailer');


exports.sendEmail = async (to, subject, text) => {
    try {
        // create a transporter object usin SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE === 'true',
            auth:{    
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,  // set up inside the mail you want to use
            }
        })

        // Set up email data
        const mailOptions = {
            from: process.env.EMAIL_USER, // sender address
            to, // list of receivers
            subject, // Subject line
            text // plain text body
        };

        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

    } catch (error) {
        console.log('Error sending email:', error);
    }
 
}

