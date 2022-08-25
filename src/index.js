const express = require("express");
const dotenv = require("dotenv");
const {connect} = require("./helpers/db")
const {setUpCloudinary} = require("./helpers/cloudinary")

dotenv.config();
const PORT = process.env.PORT;
connect(); 
setUpCloudinary();

const app = express();
app.listen(PORT, () => {
   console.log(`Server running on port -> http://localhost:${PORT}`)
})