const { User, Event, Post, Comment, Poll } = require('./schemas')

const pw_hash = (password) => {
    let n = 0
    for(let i = 0; i < password.length; i++) {
        n = (n << 5) - n + password.charCodeAt(i)
    }
    return n
}

module.exports = {

    authUser: (name, password) => {
        return new Promise((res, rej) => {
            User.findOne({name: name}, (err, user) => {
                if(err) {
                    rej({code: 500, reason: err})
                } else if(!user) {
                    rej({code: 404, reason: 'User doesn\'t exist'})
                } else {
                    if(pw_hash(password) != user.password) {
                        rej({code: 403, reason: 'Invalid password'})
                    } else {
                        res(user)
                    }
                }
            })
        })
    },

    addUser: (name, password) => {
        return new Promise((res, rej) => {
            User.findOne({name: name}, (err, user) => {
                if(err) {
                    rej({code: 500, reason: err})
                } else if(user) {
                    rej({code: 409, reason: 'User already exists'})
                } else {
                    User.create({name: name, password: pw_hash(password)}, (err, new_user) => {
                        if(err) {
                            rej({code: 500, reason: err})
                        } else {
                            console.log(`Created new user ${new_user.name}`)
                            res(new_user)
                        }
                    })
                }
            })
        })
    },

    deleteUser: (name) => {
        return new Promise((res, rej) => {
            User.findOne({name: name}, (err, user) => {
                if(err) {
                    rej({code: 500, reason: err})
                } else if(!user) {
                    rej({code: 404, reason: 'User doesn\'t exist'})
                } else {
                    User.deleteOne({name: name}, (err) => {
                        if(err) {
                            rej({code: 500, reason: err})
                        } else {
                            console.log(`Removed user ${name}`)
                            res()
                        }
                    })
                }
            })
        })
    },

    userExists: (name) => {
        return new Promise((res, rej) => {
            User.findOne({name: name}, (err, user) => {
                if(err) {
                    rej({code: 500, reason: err})
                } else if(!user) {
                    rej({code: 404, reason: 'User doesn\'t exist'})
                } else {
                    console.log(user)
                    res()
                }
            })
        })
    },

    addPost: (category, title, body) => {
        return new Promise((res, rej) => {
            Post.create({category: category, title: title, body: body}, (err, new_post) => {
                if(err) {
                    rej({code: 500, reason: err})
                } else {
                    console.log(`Created new post ${new_post.title} in category ${new_post.category}`)
                    res(new_post)
                }
            })
        })
    }

}
