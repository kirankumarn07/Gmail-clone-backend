const express = require("express");
const cors = require("cors");
const app = express();
// const mongoose=require('mongoose')

// Middleware
app.use(express.json());
app.use(cors()); 

// Database connection
require("./database/db")();
require("./routes/route")(app);


// mongoose.set('strictQuery', true);
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
module.exports = server;
