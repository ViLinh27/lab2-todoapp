/*
The GET and POST /post endpoints require the plaintext userId from the access_token passed in the
authorization header in order to associate newly created posts with the logged in user and to retrieve the logged in
users created posts
*/
/*
One method of making the plaintext userId available in both request handlers is to add a piece of middleware to
the post route which will verify the token is valid, parse it, and append the payload object to the request
*/

const express = require("express");
const jwt = require("jsonwebtoken");
const ToDo = require("../models/ToDo");
const User = require("../models/User");

const privateKey = ``;

const router = express.Router();

//helps verify token
router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
        //verify token here
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      // log the....
      return res.status(401).json({ error: error.message });
    }
  } else {//if authorization header didn't work out
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();//what's the next request
});

//waits to see if req went through to persist the post i guess : POST request // authoring new post
router.post("/", async function (req, res) {
    const toDo = new ToDo({//post model//the todo note
        title: req.body.title,
        description: req.body.description,
        author: req.payload.id,//notice how this is from payload instead of req body
        dateCreated: req.bldy.dateCreated,
        complete: req.body.complete
    });

    return toDo //will req go through and save??
        .save() //note the promise here: the promise will either resolve or reject an object: the savePost from the looks of it
            .then((savedPost) => {
                return res.status(201).json({//the req went through!!
                    id: savedPost._id,
                    title: savedPost.title,
                    description: savedPost.description,
                    author: savedPost.author,
                    dateCreated: savedPost.dateCreated,
                    complete:savedPost.complete
                });
            })
        .catch((error) => {
            return res.status(500).json({ error: "Something went wrong...." });
    });
});

//retrieving user's posts: GET request
router.get("/", async function (req, res, next) {
    const posts = await ToDo.find().where("author").equals(req.payload.id).exec();
    return res.status(200).json({ posts: posts });
});

router.get("/:id", async function(req, res, next){
  const post = await ToDo.findOne().where("_id").equals(req.params.id).exec();
  return res.status(200).json(post);
});

module.exports = router;



