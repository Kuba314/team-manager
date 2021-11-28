const express = require('express')
const cookieParser = require("cookie-parser")
const sessions = require('express-session')

const db = require('./db/methods')

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
        <form method="POST" action="login"><input type="text" name="username"/><input type="text" name="password"/><input type="submit" value="Login"/></form>\
        <form method="POST" action="logout"><input type="submit" value="Log out"/></form>\
        <form method="POST" action="addUser"><input type="text" name="username"/><input type="text" name="password"/><input type="submit" value="Create user"/></form>\
        <form method="POST" action="deleteUser"><input type="text" name="username"/><input type="submit" value="Delete user"/></form>\
        <form method="POST" action="userExists"><input type="text" name="username"/><input type="submit" value="User exists"/></form>\
    ')
})

const checkKeys = (req, keys) => {
    for(const key of keys) {
        if(req.body[key] == null) {
            return key
        }
    }
}

// Auth
app.post('/login', (req, res) => {
    const missingKey = checkKeys(req, ['username', 'password'])
    if(missingKey) {
        res.status(400).send(`Missing key: ${missingKey}`)
        return
    }

    db.authUser(req.body.username, req.body.password).then(user => {
        console.log(user)
        req.session.username = user.name
        res.send()
    }).catch(e => {
        console.log(e)
        res.status(e.code).send(e.reason)
    })
})
app.post('/logout', (req, res) => {
    if(!req.session.username) {
        res.status(403).send('Not logged in')
        return
    }

    req.session.username = null
    res.send()
})

// Users
app.post('/addUser', (req, res) => {
    const missingKey = checkKeys(req, ['username', 'password'])
    if(missingKey) {
        res.status(400).send(`Missing key: ${missingKey}`)
        return
    }

    db.addUser(req.body.username, req.body.password).then(user => {
        res.status(201).send(user.name)
    }).catch(e => {
        res.status(e.code).send(e.reason)
    })
})
app.post('/deleteUser', (req, res) => {
    const missingKey = checkKeys(req, ['username'])
    if(missingKey) {
        res.status(400).send(`Missing key: ${missingKey}`)
        return
    }

    if(req.username != req.session.username) {
        res.status(403).send('Can\'t delete a different user')
        return
    }

    db.deleteUser(req.body.username).then(() => {
        res.sendStatus(200)
    }).catch(e => {
        res.status(e.code).send(e.reason)
    })
})
app.post('/userExists', (req, res) => {
    const missingKey = checkKeys(req, ['username'])
    if(missingKey) {
        res.status(400).send(`Missing key: ${missingKey}`)
        return
    }

    db.userExists(req.body.username).then(() => {
        res.sendStatus(200)
    }).catch(e => {
        res.status(e.code).send(e.reason)
    })
})

// Posts
app.post('/addPost', (req, res) => {
    const missingKey = checkKeys(req, ['category', 'title', 'body'])
    if(missingKey) {
        res.status(400).send(`Missing key: ${missingKey}`)
        return
    }

    if(!req.session.username) {
        res.status(403).send('Not logged in')
        return
    }

    db.addPost(req.body.category, req.body.title, req.body.body).then(post => {
        res.send()
    }).catch(e => {
        res.status(e.code).send(e.reason)
    })
})
// app.post('/deletePost', (req, res) => {
//     const missingKey = checkKeys(req, ['username'])
//     if(missingKey) {
//         res.status(400).send(`Missing key: ${missingKey}`)
//         return
//     }

//     db.deleteUser(req.body.username).then(() => {
//         res.sendStatus(200)
//     }).catch(e => {
//         res.status(e.code).send(e.reason)
//     })
// })
// app.post('/editPost', (req, res) => {
//     const missingKey = checkKeys(req, ['username'])
//     if(missingKey) {
//         res.status(400).send(`Missing key: ${missingKey}`)
//         return
//     }

//     db.userExists(req.body.username).then(() => {
//         res.sendStatus(200)
//     }).catch(e => {
//         res.status(e.code).send(e.reason)
//     })
// })

app.listen(port)

/*
500 on error
400 missing key

addUser(username, password) -> {200: added, 409: already exists}
deleteUser(username) -> {200: removed, 404: user not found}
userExists(username) -> {200: exists, 404: user not found}



*/

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
