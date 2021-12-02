const { User, Event, Post, Comment, Poll } = require('./db/schemas')

const pw_hash = (password) => {
    let n = 0
    for(let i = 0; i < password.length; i++) {
        n = (n << 5) - n + password.charCodeAt(i)
    }
    return n
}

const send = (res, code, data) => {
    console.log(`[${code}] ${data}`)
    res.status(code).send(data)
}

module.exports = {

    // Auth
    login: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({name: username}, (err, user) => {
            if(err) {
                send(res, 500, err)
            } else if(!user) {
                send(res, 404, 'User doesn\'t exist')
            } else {
                if(pw_hash(password) != user.password_hash) {
                    send(res, 403, 'Invalid password')
                } else {
                    req.session.username = username
                    req.session.userid = user._id
                    send(res, 200)
                }
            }
        })
    },
    logout: (req, res) => {
        req.session.username = null
        req.session.userid = null
        send(res, 200)
    },
    register: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({name: username}, (err, user) => {
            if(err) {
                send(res, 500, err)
            } else if(user) {
                send(res, 409, 'User already exists')
            } else {
                User.create({name: username, password_hash: pw_hash(password)}, (err, new_user) => {
                    if(err) {
                        send(res, 500, err)
                    } else {
                        console.log(`Created new user ${new_user.name}`)
                        req.session.username = username
                        req.session.userid = new_user._id
                        send(res, 200)
                    }
                })
            }
        })
    },

    // Users
    users: (req, res) => {
        User.find({}, (err, users) => {
            for(let user of users) {
                delete user.password_hash
            }

            if(err) {
                send(res, 500, err)
            } else {
                send(res, 200, users)
            }
        })
    },
    deleteUser: (req, res) => {
        User.findOne({_id: req.session.userid}, (err, user) => {
            if(err) {
                send(res, 500, err)
            } else if(!user) {
                send(res, 404, 'User doesn\'t exist')
            } else {
                User.deleteOne({_id: req.session.userid}, (err) => {
                    if(err) {
                        send(res, 500, err)
                    } else {
                        console.log(`Removed user ${req.session.username} with id ${req.session.userid}`)
                        req.session.username = null
                        req.session.userid = null
                        send(res, 200)
                    }
                })
            }
        })
    },
    userExists: (req, res) => {
        User.findOne({name: req.body.username}, (err, user) => {
            if(err) {
                send(res, 500, err)
            } else if(!user) {
                send(res, 404, 'User doesn\'t exist')
            } else {
                console.log(user)
                send(res, 200)
            }
        })
    },

    // Posts
    posts: (req, res) => {
        Post.find({}, (err, posts) => {
            if(err) {
                send(res, 500, err)
            } else {
                send(res, 200, posts)
            }
        })
    },
    addPost: (req, res) => {
        Post.create({author: req.session.userid, category: req.body.category, title: req.body.title, body: req.body.body}, (err, new_post) => {
            if(err) {
                send(res, 500, err)
            } else {
                console.log(`Created new post ${new_post.title} in category ${new_post.category}`)
                send(res, 200)
            }
        })
    },
    deletePost: (req, res) => {
        Post.findOne({_id: req.body.post_id}, (err, post) => {
            if(err) {
                send(res, 500, err)
            } else if(!post) {
                send(res, 404, 'Post doesn\'t exist')
            } else {
                if(post.author != req.session.userid) {
                    console.log(post.author)
                    console.log(req.session.userid)
                    send(res, 403, 'Only author can delete a post')
                    return
                }
                Post.deleteOne({_id: req.body.post_id}, (err) => {
                    if(err) {
                        send(res, 500, err)
                    } else {
                        console.log(`Removed post with id ${req.body.post_id}`)
                        send(res, 200)
                    }
                })
            }
        })
    },
    editPost: (req, res) => {
        replacement = {}
        for(const key of ['category', 'title', 'body']) {
            if(key in req.body) {
                replacement[key] = req.body[key]
            }
        }
        Post.findOne({_id: req.body.post_id}, (err, post) => {
            if(err) {
                send(res, 500, err)
            } else if(!post) {
                send(res, 404, 'Post doesn\'t exist')
            } else {
                if(post.author != req.session.userid) {
                    send(res, 403, 'Only author can edit this post')
                    return
                }
                Post.updateOne({_id: req.body.post_id}, replacement, (err) => {
                    if(err) {
                        console.log(err)
                        send(res, 500, err)
                    } else {
                        console.log(`Updated post with id ${req.body.post_id}`)
                        send(res, 200)
                    }
                })
            }
        })
    },
}
