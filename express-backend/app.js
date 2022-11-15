var express = require('express');
var app = express();

require('./setupMongo')(); //lets us connect to db

/* app.get(
    "/users/:userId",

    //logging middlware  - logs request
    function (req,res,next){
        compareSync.log("Request URL: ", req.originalUrl);
        next();
    },

    function(req,res){
        res.set(req.params.userId);
    }
) */

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/post"));

module.exports = app;
