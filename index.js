const express = require('express');
require("dotenv").config();
const Port = process.env.PORT;
const router = require("./src/router");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const app = express();

require('./src/util/passport')
require('./src/util/db')


app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true, // extended allows nested JSON objects
  })
);

app.use(router)

app.listen(Port, () => {
  console.log(`server start on port:${Port}`);
});