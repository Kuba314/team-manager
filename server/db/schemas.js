const mongoose = require("mongoose");

const { Schema } = mongoose;

// mongoose.connect('mongodb://localhost:27017/testing');
mongoose.connect("mongodb://127.0.0.1:27017/testing");

const userSchema = new Schema({
  name: String,
  password_hash: String,
  phone: String,
  sex: {
    type: String,
    enum: ["male", "female"],
  },
});
const eventSchema = new Schema({
  author: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  title: String,
  body: String,
  time: Date,
  location: String,
  attendees: [
    {
      type: mongoose.ObjectId,
      ref: "User",
    },
  ],
});
const postSchema = new Schema({
  author: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    enum: [], // todo: fill static categories
  },
  title: String,
  body: String,
  comments: [
    {
      type: mongoose.ObjectId,
      ref: "Comment",
    },
  ],
});
const commentSchema = new Schema({
  author: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.ObjectId,
    ref: "Post",
  },
  text: String,
});
const pollSchema = new Schema({
  prompt: String,
  options: [String],
  author: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  votes: [
    {
      voter: {
        type: mongoose.ObjectId,
        ref: "User",
      },
      voted_option: String,
    },
  ],
});
const User = mongoose.model("User", userSchema);
const Event = mongoose.model("Event", eventSchema);
const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Poll = mongoose.model("Poll", pollSchema);

module.exports = {
  User: User,
  Event: Event,
  Post: Post,
  Comment: Comment,
  Poll: Poll,
};
