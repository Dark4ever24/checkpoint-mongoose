const express = require("express");
const { config } = require("dotenv");

const DBconnect = require("./config/DB_connect");

const PORT = process.env.PORT ||  5000

const app = express();


require("dotenv").config();

DBconnect();

app.use(express.json());

app.use("/api/person", require("./routes/person"));

app.listen(PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`server is running on port number ${PORT} happy coding`)
);
