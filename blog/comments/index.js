const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  // Ensure comments are sent as an array even if undefined
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  // Initialize comments as an array if not already present
  const comments = commentsByPostId[req.params.id] || [];

  // Push the new comment into the comments array
  comments.push({ id: commentId, content });

  // Update the comments in the store
  commentsByPostId[req.params.id] = comments;

  // Send a 201 status with the updated comments array
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});

