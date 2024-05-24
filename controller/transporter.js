const nodemailer=require('nodemailer')

export const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // Use `true` for port 465, `false` for all other ports
    service:'gmail',
    auth: {
      user: "kirankumar77717@gmail.com",
      pass: "gliy aivz tyuk dbsm",
    },
  });

