const express = require('express')
const cookieParser = require("cookie-parser")
const sessions = require('express-session')

const handlers = require('./handlers')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(sessions({
    secret: "secret-key123",
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false
}))

app.get('/', (req, res) => {
    res.send('\
        <a href="users">users</a><br><a href="posts">posts</a>\
        <form method="POST" action="login"><input type="text" name="username"/><input type="text" name="password"/><input type="submit" value="Login"/></form>\
        <form method="POST" action="logout"><input type="submit" value="Log out"/></form>\
        <form method="POST" action="register"><input type="text" name="username"/><input type="text" name="password"/><input type="submit" value="Create user"/></form>\
        <form method="POST" action="deleteUser"><input type="text" name="username"/><input type="submit" value="Delete user"/></form>\
        <form method="POST" action="userExists"><input type="text" name="username"/><input type="submit" value="User exists"/></form>\
\
        <form method="POST" action="addPost"><input type="text" name="category"/><input type="text" name="title"/><input type="text" name="body"/><input type="submit" value="Add post"/></form>\
        <form method="POST" action="deletePost"><input type="text" name="post_id"/><input type="submit" value="Delete Post"/></form>\
        <form method="POST" action="editPost"><input type="text" name="post_id"/><input type="text" name="category"/><input type="text" name="title"/><input type="text" name="body"/><input type="submit" value="Edit post"/></form>\
    ')
})

const checkKeys = (req, keys) => {
    for(const key of keys) {
        if(req.body[key] == null) {
            return key
        }
    }
}

// 200(ok)
// 500(server error)
post_endpoints = [
    { endpoint: '/login',       auth: false, callback: handlers.login,       keys: ['username', 'password']},               // 403(invalid password), 404(user doesn't exist)
    { endpoint: '/logout',      auth: true , callback: handlers.logout,      keys: []},                                     // 
    { endpoint: '/register',    auth: false, callback: handlers.register,    keys: ['username', 'password']},               // 409(user already exists) 

    { endpoint: '/deleteUser',  auth: true , callback: handlers.deleteUser,  keys: ['username']},                           // 404(user doesn't exist)
    { endpoint: '/userExists',  auth: false, callback: handlers.userExists,  keys: ['username']},                           // 404(user doesn't exist)
    { endpoint: '/addPost',     auth: true , callback: handlers.addPost,     keys: ['category', 'title', 'body']},
    { endpoint: '/deletePost',  auth: true , callback: handlers.deletePost,  keys: ['post_id']},                            // 403(not logged in as author), 404(post doesn't exist)
    { endpoint: '/editPost',    auth: true , callback: handlers.editPost,    keys: ['post_id', 'category', 'title', 'body']}// 403(not logged in as author), 404(post doesn't exist)
]

get_endpoints = [
    { endpoint: '/users', auth: false, callback: handlers.users},
    { endpoint: '/posts', auth: false, callback: handlers.posts},
]

for(let endpoint of post_endpoints) {
    app.post(endpoint.endpoint, (req, res) => {
        const missingKey = checkKeys(req, endpoint.keys)
        if(missingKey) {
            res.status(400).send(`Missing key: ${missingKey}`)
            return
        }

        if(endpoint.auth && !req.session.username) {
            res.status(403).send('Not logged in')
            return
        }

        endpoint.callback(req, res)
    })
}

for(let endpoint of get_endpoints) {
    app.get(endpoint.endpoint, (req, res) => {

        if(endpoint.auth && !req.session.username) {
            res.status(403).send('Not logged in')
            return
        }

        endpoint.callback(req, res)
    })
}

app.listen(port)

// addPost
// deletePost
// editPost

// addComment
// editComment
// deleteComment

// addEvent
// deleteEvent
// editEvent
// addUserToEvent
// removeUserFromEvent

// addPoll
// addVote
// removeVote

// app.post('/addEvent', (req, res) => {
    
// })
// app.post('/addPost', (req, res) => {
    
// })
// app.post('/addComment', (req, res) => {
    
// })
// app.post('/addPoll', (req, res) => {
    
// })
