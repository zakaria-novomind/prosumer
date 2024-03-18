// Import nodemailer module
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'zimmermannzacharias89@gmail.com', // Your email address
        pass: 'wdmsgkxfklpyvtpr ' // Your password
    }
});

// Email content
let mailOptions = {
    from: 'zimmermannzacharias89@gmail.com', // Sender email address
    to: 'zakizermani@gmail.com', // List of receivers
    subject: 'new update of the prosumer app must be installed', // Subject line
    text: 'please pull the new version!', // Plain text body
 //   html: '<b>Hello world!</b>' // HTML body
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
