const mongoose = require('mongoose')

const {hashPassword} = require('../helpers/bcryptjs')

let Schema = mongoose.Schema

let userSchema = new Schema({
    username: {type:String,required: [true, 'username is required']},
    password: {type:String,required: [true, 'password is required']},
    wishlist: []
})

userSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

let User = mongoose.model('User',userSchema)

module.exports = User