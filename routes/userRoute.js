const bcrypt = require("bcrypt");
const express = require('express');
const { User } = require('../model/user');
const jwt = require('jsonwebtoken');
// const transporter=require('../controller/transporter')
const userRouter = express.Router();
const nodemailer=require('nodemailer');
const { Email } = require("../model/email");
const { getEmails } = require("../controller/email-controller");


 const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // Use `true` for port 465, `false` for all other ports
    service:'gmail',
    auth: {
      user: "kirankumar77717@gmail.com",
      pass: "gliy aivz tyuk dbsm",
    },
  });

// Register route
userRouter.post(
    "/register",
    async (req, res) => {
        try {
            const data = req.body;
            console.log(data, "payload");
            if(data.name.length < 5) return res.status(400).send("Name Should Be Contain More Than Five")
             // Validate email
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
              return res.status(400).send("Invalid email address");
          }
            if(data.password.length < 6) return res.status(400).send("Password Should Be Contain More Than Five")
            // Check if the user already exists
            const findUser = await User.findOne({ email: data.email });
            if (findUser) {
                return res.status(400).send("User already exists");
            }

            // Encrypt the password
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);

            // Save the user data
            const newUser = new User(data);
            await newUser.save();

            console.log("User registered:", newUser);
            return res.status(200).send("Success");
        } catch (error) {
            console.error("Error registering user:", error);
            return res.status(500).send("Internal Server Error");
        }
    }
);

// Login route
userRouter.post(
    "/login",
    async (req, res) => {
        try {
            const { email, password } = req.body;
               // Validate email
               if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).send("Invalid email address");
            }
              if(password.length < 6) return res.status(400).send("Password Should Be Contain More Than Five")
            // Validate email and password
            if (!email || !password) {
                return res.status(400).send("Email and password are required");
            }

            // Check if the user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).send("User not found");
            }

            // Validate password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).send("Invalid password");
            }
  // Password is correct, generate JWT token
  const token = jwt.sign({ userId: user._id ,name:user.name}, "jwtsecrytyt", { expiresIn: '1h' });

            // Password is correct, login successful
            console.log("User logged in:", user);
            return res.status(200).send(token);
        } catch (error) {
            console.error("Error logging in:", error);
            return res.status(500).send("Internal Server Error");
        }
    }
);
userRouter.post(
  "/email",
  async (req, res) => {
    try {
      console.log(req.body);
      let mailOptions = {
        from: "kirankumar77717@gmail.com",
        to: req.body.to, 
        subject: req.body.subject,
        text: req.body.body
    }

    let mail = ""
    transporter.sendMail(mailOptions, function (err,success) {
        if (err) {
            mail = err?.message
        }
        else {
            mail = "mail sent"
        }
    })
  // Create a new email object
  const newEmail = {
    to: mailOptions.to,
    from: mailOptions.from,
    subject: mailOptions.subject,
    body: mailOptions.text
};
console.log("New email:", newEmail);

// Save the new email to the database
const newUser = new Email(newEmail);
await newUser.save();

    res.send({message:"mail sent",data:mail})
    
    } catch (error) {
      
    }
  })


  userRouter.get("/find_emails",async(req,res)=>{
    const data=await Email.find()
    console.log(data);
   const getEmail= new getEmails('sent');
    return res.send({data,getEmail})
  })

module.exports = userRouter;
