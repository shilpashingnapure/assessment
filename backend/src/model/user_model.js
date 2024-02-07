
import mongoose from 'mongoose';

import bcrypt from 'bcryptjs';

const user = new mongoose.Schema({
    username : { type : String} ,
    password : { type : String}  
} , {
    timestamps : true
})

user.pre('save' , function (next){
    if (!this.isModified('password')) return next();
    var hash = bcrypt.hashSync(this.password , 8)
    this.password = hash;
    return next();
})

user.methods.checkPassword = function (password){
    return bcrypt.compareSync(password , this.password);
}


export const User = mongoose.model("user" , user);
