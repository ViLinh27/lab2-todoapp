var express = require('express');
var app = express();

require('./setupMongo')(); //lets us connect to db

app.use(express.json());//accepting json request bodies//parse req bodies

app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/post"));

module.exports = app;
