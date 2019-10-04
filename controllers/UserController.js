const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static register (req,res,next) {
        console.log('masuuk')
        const {username,password} = req.body
        User.findOne({username})
        .then(user => {
            if (user){
                throw {
                    msg: 'username is already taken',
                    statusCode: 401
                }
            }
            else{
                return User.create({username,password})
            }
        })
        .then(result => {
            let payload = {username:result.username}
            let token = generateToken(payload)
            res.status(201).json(token)
        })
        .catch(err=>{
            next(err.msg||err.message.slice(24))
        })
    }
    static login (req,res,next) {
        const {username,password} = req.body
        User.findOne({username})
        .then(user=>{
            if(user && comparePassword(password,user.password)) {
                let payload = {username:user.username}
                let token = generateToken(payload)
                res.status(200).json(token)
            } else {
                throw {
                    msg: 'invalid email/password',
                    statusCode: 401
                }
            }
        })
        .catch(next)
    }
    static signGoogle(req, res, next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let username = null
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE
        })
            .then(ticket => {
                let {name}= ticket.getPayload()
                username = name
                return User.findOne({username})
            })
            .then(user => {
                if (user){
                    const payload = {username}
                    let token = generateToken(payload)
                    res.status(201).json(token)
                }
                else{
                    return User.create({username, password:"google"})
                }
            })
            .then(result => {
                let payload = {username:result.username}
                let token = generateToken(payload)
                res.status(201).json(token)
            })
            .catch(next)
    }
    static addWishlist(req, res, next){
        console.log(req.loggedUser);
        console.log(req.body);

        User.update({username:req.loggedUser.username} ,{"$push": { "wishlist": req.body }})
            .then(data => {
                console.log(data);
                res.status(201).json(data)
            })
            .catch(next)

    }
    static allWishlist(req, res, next){
        User.findOne({username:req.loggedUser.username})
            .then(user => {
                console.log(user.wishlist);
                res.status(200).json(user.wishlist)
            })
            .catch(next)
    }
}

module.exports = UserController