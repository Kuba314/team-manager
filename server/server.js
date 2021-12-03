const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const cors = require("cors");

const handlers = require("./handlers");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(
  sessions({
    secret: "secret-key123",
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false,
  })
);

app.get("/", (req, res) => {
  res.send(
    '\
        <h3>links</h3>\
        <a href="users">users</a><br><a href="posts">posts</a><br><a href="events">events</a><br><a href="polls">polls</a><br>\
        <a href="myPosts">myPosts</a><br><a href="myEvents">myEvents</a><br><a href="joinedEvents">joinedEvents</a>\
        <h3>auth</h3>\
        <form method="POST" action="login"><input name="username"/><input name="password"/><input type="submit" value="Login"/></form>\
        <form method="POST" action="logout"><input type="submit" value="Log out"/></form>\
        <form method="POST" action="register"><input name="username"/><input name="password"/><input type="submit" value="Create user"/></form>\
        <form method="POST" action="deleteUser"><input type="submit" value="Delete user"/></form>\
        <form method="POST" action="userExists"><input name="username"/><input type="submit" value="User exists"/></form>\
        <h3>posts</h3>\
        <form method="POST" action="addPost"><input name="category"/><input name="title"/><input name="body"/><input type="submit" value="Add post"/></form>\
        <form method="POST" action="deletePost"><input name="post_id"/><input type="submit" value="Delete post"/></form>\
        <form method="POST" action="editPost"><input name="post_id"/><input name="category"/><input name="title"/><input name="body"/><input type="submit" value="Edit post"/></form>\
        <form method="POST" action="comment"><input name="post_id"/><input name="text"/><input type="submit" value="Comment"/></form>\
        <form method="POST" action="deleteComment"><input name="comment_id"/><input type="submit" value="Delete comment"/></form>\
        <h3>events</h3>\
        <form method="POST" action="addEvent"><input name="title"/><input name="body"/><input name="time"/><input name="location"/><input type="submit" value="Add event"/></form>\
        <form method="POST" action="deleteEvent"><input name="event_id"/><input type="submit" value="Delete event"/></form>\
        <form method="POST" action="editEvent"><input name="event_id"/><input name="title"/><input name="body"/><input name="time"/><input name="location"/><input type="submit" value="Edit event"/></form>\
        <form method="POST" action="joinEvent"><input name="event_id"/><input type="submit" value="Join event"/></form>\
        <form method="POST" action="leaveEvent"><input name="event_id"/><input type="submit" value="Leave event"/></form>\
        <h3>polls</h3>\
        <form method="POST" action="addPoll"><input name="prompt"/><input name="options[]"/><input name="options[]"/><input type="submit" value="Add poll"/></form>\
        <form method="POST" action="deletePoll"><input name="poll_id"/><input type="submit" value="Delete poll"/></form>\
        <form method="POST" action="vote"><input name="poll_id"/><input name="option"/><input type="submit" value="Vote"/></form>\
        <form method="POST" action="clearVote"><input name="poll_id"/><input type="submit" value="Clear vote"/></form>\
    '
  );
});

const checkKeys = (req, keys) => {
  for (const key of keys) {
    if (req.body[key] == null) {
      return key;
    }
  }
};

// 200(ok)
// 403(not logged in or generally not authorized to perform this operation)
// 500(server error)
post_endpoints = [
  {
    endpoint: "/login",
    auth: false,
    callback: handlers.login,
    keys: ["username", "password"],
  }, // 403(invalid password), 404(user doesn't exist)
  { endpoint: "/logout", auth: true, callback: handlers.logout, keys: [] }, //
  {
    endpoint: "/register",
    auth: false,
    callback: handlers.register,
    keys: ["username", "password"],
  }, // 409(user already exists)

  {
    endpoint: "/deleteUser",
    auth: true,
    callback: handlers.deleteUser,
    keys: [],
  }, // 404(user doesn't exist)
  {
    endpoint: "/userExists",
    auth: false,
    callback: handlers.userExists,
    keys: ["username"],
  }, // 404(user doesn't exist)

  {
    endpoint: "/addPost",
    auth: true,
    callback: handlers.addPost,
    keys: ["category", "title", "body"],
  },
  {
    endpoint: "/deletePost",
    auth: true,
    callback: handlers.deletePost,
    keys: ["post_id"],
  }, // 403(not logged in as author), 404(post doesn't exist)
  {
    endpoint: "/editPost",
    auth: true,
    callback: handlers.editPost,
    keys: ["post_id", "category", "title", "body"],
  }, // 403(not logged in as author), 404(post doesn't exist)
  {
    endpoint: "/comment",
    auth: true,
    callback: handlers.comment,
    keys: ["post_id", "text"],
  }, // 404(post not found)
  {
    endpoint: "/deleteComment",
    auth: true,
    callback: handlers.deleteComment,
    keys: ["comment_id"],
  }, // 403(not logged in as author), 404(comment not found)

  {
    endpoint: "/addEvent",
    auth: true,
    callback: handlers.addEvent,
    keys: ["title", "body", "time", "location"],
  }, //
  {
    endpoint: "/deleteEvent",
    auth: true,
    callback: handlers.deleteEvent,
    keys: ["event_id"],
  }, // 403(not logged in as author), 404(event doesn't exist)
  {
    endpoint: "/editEvent",
    auth: true,
    callback: handlers.editEvent,
    keys: ["event_id", "title", "body", "time", "location"],
  }, // 403(not logged in as author), 404(event doesn't exist)
  {
    endpoint: "/joinEvent",
    auth: true,
    callback: handlers.joinEvent,
    keys: ["event_id"],
  }, // 404(event doesn't exist), 409(already joined)
  {
    endpoint: "/leaveEvent",
    auth: true,
    callback: handlers.leaveEvent,
    keys: ["event_id"],
  }, // 404(event doesn't exist), 409(not attending this event)

  {
    endpoint: "/addPoll",
    auth: true,
    callback: handlers.addPoll,
    keys: ["prompt", "options"],
  }, //
  {
    endpoint: "/deletePoll",
    auth: true,
    callback: handlers.deletePoll,
    keys: ["poll_id"],
  }, // 403(not logged in as author), 404(poll not found)
  {
    endpoint: "/vote",
    auth: true,
    callback: handlers.vote,
    keys: ["poll_id", "option"],
  }, // 403(not logged in as author), 404(poll not found)
  {
    endpoint: "/clearVote",
    auth: true,
    callback: handlers.clearVote,
    keys: ["poll_id"],
  }, // 403(not logged in as author), 404(poll not found)
];

get_endpoints = [
  { endpoint: "/users", auth: false, callback: handlers.users },

  { endpoint: "/posts", auth: false, callback: handlers.posts },
  { endpoint: "/events", auth: false, callback: handlers.events },
  { endpoint: "/polls", auth: false, callback: handlers.polls },

  { endpoint: "/myPosts", auth: true, callback: handlers.myPosts },
  { endpoint: "/myEvents", auth: true, callback: handlers.myEvents },
  { endpoint: "/joinedEvents", auth: true, callback: handlers.joinedEvents },
];

const performAuth = (req, res) => {
  if (req.body.token) {
    const userid = handlers.loggedInUsers.get(req.body.token);
    if (!userid) {
      res.status(403).send("Invalid token");
      return false;
    }
    req.session.userid = userid;
  }

  if (!req.session.userid) {
    res.status(403).send("Not logged in");
    return false;
  }
  return true;
};

for (let endpoint of post_endpoints) {
  app.post(endpoint.endpoint, (req, res) => {
    const missingKey = checkKeys(req, endpoint.keys);
    if (missingKey) {
      res.status(400).send(`Missing key: ${missingKey}`);
      return;
    }

    for (const key in req.body) {
      if (key.endsWith("_id") && !req.body[key].match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400).send(`${key} has to be a valid id`);
        return;
      }
    }

    if (endpoint.auth && !performAuth(req, res)) {
      return;
    }

    endpoint.callback(req, res);
  });
}

for (let endpoint of get_endpoints) {
  app.get(endpoint.endpoint, (req, res) => {
    if (endpoint.auth && !performAuth(req, res)) {
      return;
    }

    endpoint.callback(req, res);
  });
}

app.listen(port);
