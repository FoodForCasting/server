const User = require('../models/user')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register (req,res,next) {
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
        .catch(next)
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
}

module.exports = UserController