// read.js
const fs = require('fs');
const readline = require('readline')


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

// // Email content
// let mailOptions = {
//     from: 'zimmermannzacharias89@gmail.com', // Sender email address
//     to: 'zakizermani@gmail.com', // List of receivers
//     subject: 'new update of the prosumer app must be installed', // Subject line
//     text: 'please pull the new version!', // Plain text body
//  //   html: '<b>Hello world!</b>' // HTML body
// };






// // Send email
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
// });


const readStream = fs.createReadStream('daten/Clients-mails.txt', 'utf-8');
let rl = readline.createInterface({ input: readStream });
rl.on('line', (line) => {

    let array = line.split(";");
    const dns = array[1]
    const htmltext = '<p>please pull the new version! click this Link to Download the latest version: <a href="'+dns+'">'+dns+'</a></p>'


    // Email content
let mailOptions = {
    from: 'zimmermannzacharias89@gmail.com', // Sender email address
    to: array[0], // List of receivers
    subject: 'new update of the prosumer app must be installed', // Subject line
    //text: text , // Plain text body
    html: htmltext // HTML body
};


// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
    

    
});
rl.on('close', () => {
  
    console.log('kunden wurden benachrichtigt');
});

readStream.on('error', (error) => console.log(error.message));
readStream.on('data', (chunk) => {

    // console.log(chunk)
});
readStream.on('end', () => {

});