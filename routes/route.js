// import express from 'express';

// import { saveSendEmails, getEmails, toggleStarredEmail, deleteEmails, 
//     moveEmailsToBin, getRoute, 
//     loginRoute} from '../controller/email-controller.js';

// const routes = express.Router();

// routes.post('/save', saveSendEmails);
// routes.post('/save-draft', saveSendEmails);
// routes.get('/emails/:type', getEmails);
// routes.post('/starred', toggleStarredEmail);
// routes.delete('/delete', deleteEmails);
// routes.post('/bin', moveEmailsToBin);
// routes.get('/', getRoute);


// export default routes;

const express = require("express");
const User = require("./userRoute");
const emailRouter = require("./sendmail")

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", User);
  app.use("/api/email", emailRouter)
  
};