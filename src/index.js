const express = require("express");
const dotenv = require("dotenv");
const {connect} = require("./helpers/db")

dotenv.config();
const PORT = process.env.PORT;
connect()

const app = express();
app.listen(PORT, () => {
   console.log(`Server running on port -> http://localhost:${PORT}`)
})