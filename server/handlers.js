const { User, Event, Post, Comment, Poll } = require('./db/schemas')

const pw_hash = (password) => {
    let n = 0
    for(let i = 0; i < password.length; i++) {
        n = (n << 5) - n + password.charCodeAt(i)
    }
    return n
}

const send = (res, code, data) => {
    if(data) {
        console.log(`[server] [http:${code}] ${JSON.stringify(data)}`)
    } else {
        console.log(`[server] [http:${code}]`)
    }
    res.status(code).send(data)
}

const generateToken = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
}

loggedInUsers = new Map()

module.exports = {

    loggedInUsers: loggedInUsers,

    // Auth
    login: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({name: username}, (err, user) => {
            if(err) {
                send(res, 500, err)
            } else if(!user) {
                send(res, 404, 'User not found')
            } else {
                if(pw_hash(password) != user.password_hash) {
                    send(res, 403, 'Invalid password')
                } else {
                    const token = generateToken()
                    loggedInUsers.set(token, user._id)
                    req.session.userid = user._id
                    send(res, 200, token)
                }
            }
        })
    },
    logout: (req, res) => {
        const ix = loggedInUsers.indexOf(req.body.token)
        loggedInUsers.splice(ix, 1)
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
                        console.log(`[db] Created new user(${new_user._id}) ${new_user.name}`)
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
                send(res, 404, 'User not found')
            } else {
                User.deleteOne({_id: req.session.userid}, (err) => {
                    if(err) {
                        send(res, 500, err)
                    } else {
                        console.log(`[db] Removed user(${req.session.userid})`)
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
                send(res, 404, 'User not found')
            } else {
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
        }).populate('comments')
    },
    myPosts: (req, res) => {
        Post.find({author: req.session.userid}, (err, posts) => {
            if(err) {
                send(res, 500, err)
            } else {
                send(res, 200, posts)
            }
        }).populate('comments')
    },
    addPost: (req, res) => {
        Post.create({author: req.session.userid, category: req.body.category, title: req.body.title, body: req.body.body}, (err, new_post) => {
            if(err) {
                send(res, 500, err)
            } else {
                console.log(`[db] Created new post(${new_post._id}) ${new_post.title} in category ${new_post.category}`)
                send(res, 200)
            }
        })
    },
    deletePost: (req, res) => {
        Post.findOne({_id: req.body.post_id}, (err, post) => {
            if(err) {
                send(res, 500, err)
            } else if(!post) {
                send(res, 404, 'Post not found')
            } else {
                if(post.author != req.session.userid) {
                    send(res, 403, 'Only author can delete this post')
                    return
                }
                Post.deleteOne({_id: req.body.post_id}, (err) => {
                    if(err) {
                        send(res, 500, err)
                    } else {
                        console.log(`[db] Removed post(${req.body.post_id})`)
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
                send(res, 404, 'Post not found')
            } else {
                if(post.author != req.session.userid) {
                    send(res, 403, 'Only author can edit this post')
                    return
                }
                Post.updateOne({_id: req.body.post_id}, replacement, (err) => {
                    if(err) {
                        send(res, 500, err)
                    } else {
                        console.log(`[db] Updated post(${req.body.post_id})`)
                        send(res, 200)
                    }
                })
            }
        })
    },

    // Comments
    comment: (req, res) => {
        Post.findOne({_id: req.body.post_id}, (err, post) => {
            if(err) {
                send(res, 500, err)
            } else if(!post) {
                send(res, 404, 'Post not found')
            } else {
                Comment.create({author: req.session.userid, post: req.body.poll_id, text: req.body.text}, (err, new_comment) => {
                    Post.updateOne({_id: req.body.post_id}, {$push: {
                        comments: new_comment.id
                    }}, (err) => {
                        if(err) {
                            send(res, 500, err);
                        } else {
                            console.log(`[db] User(${req.session.userid}) commented on post(${req.body.post_id})`)
                            send(res, 200);
                        }
                    });
                })
            }
        })
    },
    deleteComment: (req, res) => {
        Post.findOne({comments: {_id: req.body.comment_id}}, (err, post) => {
            if(err) {
                send(res, 500, err)
            } else if(!post) {
                send(res, 404, 'Comment not found on any post')
            } else {
                Post.updateOne({_id: post.id}, {$pull: {comments: {_id: req.body.comment_id}}}, (err) => {
                    if(err) {
                        send(res, 500, err);
                    } else {
                        send(res, 200);
                    }
                });

                Comment.deleteOne({_id: req.body.comment_id}, (err) => {
                    if(err) {
                        send(res, 500, err)
                    } else {
                        console.log(`[db] User(${req.session.userid}) deleted a comment(${req.body.comment_id}) on post(${post.id})`)
                        send(res, 200)
                    }
                })
            }
        })
    },

    // Events
    events: (req, res) => {
        Event.find({}, (err, events) => {
            if(err) {
                send(res, 500, err)
            } else {
                send(res, 200, events)
            }
        })
    },
    myEvents: (req, res) => {
        Event.find({author: req.session.userid}, (err, events) => {
            if(err) {
                send(res, 500, err)
            } else {
                send(res, 200, events)
            }
        })
    },
    joinedEvents: (req, res) => {
        Event.find({attendees: req.session.userid}, (err, events) => {
            if(err) {
                send(res, 500, err)
            } else {
                send(res, 200, events)
            }
        })
    },
    addEvent: (req, res) => {
        Event.create({author: req.session.userid, title: req.body.title, body: req.body.body, time: req.body.time, location: req.body.location, attendees: []}, (err, new_event) => {
            if(err) {
                send(res, 500, err)
            } else {
                console.log(`[db] Created new event(${new_event._id}) ${new_event.title}`)
                send(res, 200)
            }
        })
    },
    deleteEvent: (req, res) => {
        Event.findOne({_id: req.body.event_id}, (err, event) => {
            if(err) {
                send(res, 500, err)
            } else if(!event) {
                send(res, 404, 'Event not found')
            } else {
                if(event.author != req.session.userid) {
                    send(res, 403, 'Only author can delete this event')
                    return
                }
                Event.deleteOne({_id: req.body.event_id}, (err) => {
                    if(err) {
                        send(res, 500, err)
                    } else {
                        console.log(`[db] Removed event(${req.body.event_id})`)
                        send(res, 200)
                    }
                })
            }
        })
    },
    editEvent: (req, res) => {
        replacement = {}
        for(const key of ['title', 'body', 'time', 'location']) {
            if(key in req.body) {
                replacement[key] = req.body[key]
            }
        }
        Event.findOne({_id: req.body.event_id}, (err, event) => {
            if(err) {
                send(res, 500, err)
            } else if(!event) {
                send(res, 404, 'Event not found')
            } else {
                if(event.author != req.session.userid) {
                    send(res, 403, 'Only author can edit this event')
                    return
                }
                Event.updateOne({_id: req.body.event_id}, replacement, (err, event) => {
                    if(err) {
                        send(res, 500, err)
                    } else {
                        console.log(`[db] Updated event(${req.body.event_id})`)
                        send(res, 200)
                    }
                })
            }
        })
    },
    joinEvent: (req, res) => {
        Event.findOne({_id: req.body.event_id}, (err, event) => {
            if(err) {
                send(res, 500, err)
            } else if(!event) {
                send(res, 404, 'Event not found')
            } else if(req.session.userid in event.attendees) {
                send(res, 409, 'User already attending this event')
            } else {
                Event.updateOne({_id: req.body.event_id}, {$push: {attendees: req.session.userid}}, (err) => {
                    if(err) {
                        send(res, 500, err);
                    } else {
                        console.log(`[db] User(${req.session.userid}) joined event(${req.body.event_id})`)
                        send(res, 200);
                    }
                });
            }
        })
    },
    leaveEvent: (req, res) => {
        Event.findOne({_id: req.body.event_id}, (err, event) => {
            if(err) {
                send(res, 500, err)
            } else if(!event) {
                send(res, 404, 'Event not found')
            } else if(req.session.userid in event.attendees) {
                send(res, 409, 'User already not attending this event')
            } else {
                Event.updateOne({_id: req.body.event_id}, {$pull: {attendees: req.session.userid}}, (err) => {
                    if(err) {
                        send(res, 500, err);
                    } else {
                        console.log(`[db] User(${req.session.userid}) left event(${req.body.event_id})`)
                        send(res, 200);
                    }
                });
            }
        })
    },

    // Polls
    polls: (req, res) => {
        Poll.find({}, (err, polls) => {
            if(err) {
                send(res, 500, err)
            } else {
                send(res, 200, polls)
            }
        })
    },
    addPoll: (req, res) => {
        Poll.create({author: req.session.userid, prompt: req.body.prompt, options: req.body.options, voters: []}, (err, new_poll) => {
            if(err) {
                send(res, 500, err)
            } else {
                console.log(`[db] Created new poll(${new_poll._id}) ${new_poll.prompt}`)
                send(res, 200)
            }
        })
    },
    deletePoll: (req, res) => {
        Poll.findOne({_id: req.body.poll_id}, (err, poll) => {
            if(err) {
                send(res, 500, err)
            } else if(!poll) {
                send(res, 404, 'Poll not found')
            } else {
                if(poll.author != req.session.userid) {
                    send(res, 403, 'Only author can delete this poll')
                    return
                }
                Poll.deleteOne({_id: req.body.poll_id}, (err) => {
                    if(err) {
                        send(res, 500, err)
                    } else {
                        console.log(`[db] Removed poll(${req.body.poll_id})`)
                        send(res, 200)
                    }
                })
            }
        })
    },
    vote: (req, res) => {
        Poll.findOne({_id: req.body.poll_id}, (err, poll) => {
            if(err) {
                send(res, 500, err)
            } else if(!poll) {
                send(res, 404, 'Poll not found')
            } else {
                Poll.updateOne({_id: req.body.poll_id}, {$set: {
                    votes: {
                        voter: req.session.userid,
                        voted_option: req.body.option
                    }
                }}, {upsert: true}, (err) => {
                    if(err) {
                        send(res, 500, err);
                    } else {
                        console.log(`[db] User(${req.session.userid}) voted on poll(${req.body.poll_id})`)
                        send(res, 200);
                    }
                });
            }
        })
    },
    clearVote: (req, res) => {
        Poll.findOne({_id: req.body.poll_id}, (err, poll) => {
            if(err) {
                send(res, 500, err)
            } else if(!poll) {
                send(res, 404, 'Poll not found')
            } else {
                Poll.updateOne({_id: req.body.poll_id}, {$unset: {
                    votes: {
                        voter: req.session.userid
                    }
                }}, {upsert: true}, (err) => {
                    if(err) {
                        send(res, 500, err);
                    } else {
                        console.log(`[db] User(${req.session.userid}) cleared vote on poll(${req.body.poll_id})`)
                        send(res, 200);
                    }
                });
            }
        })
    }
}
