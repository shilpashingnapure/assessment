
import jwt from "jsonwebtoken";
import {User} from "../model/user_model.js";

const newToken = (user)=> {
    return jwt.sign({ user} , 'post')
}

export const register = async (req , res) => {

    try {
        let isExistUser = await User.find({ username : req.body.username}).lean().exec();

        if(isExistUser.length != 0){
            return res.status(400).send({ message : 'username is already exist !! try with different username !!!'})
        }

        let user = await User.create(req.body)
        const token = newToken(user)
        res.send({ user , token})
    }catch(err){
        res.status(500).send(err.message)
    }
    

}


export const login =  async (req, res) => {
    try {
        const user = await User.findOne({ username : req.body.username})
        if (!user){
            return res.status(400).send({ message : 'place check your username or password'})
        }

        const match = user.checkPassword(req.body.password)
        if (!match){
            return res.status(400).send({ message : 'place check your username or password'})
        }
        const token = newToken(user)
        res.send({ user , token})

    }catch(err){
        console.log(err)
    }
}

export const findById = async (req , res) => {
    try{
        const user =  await User.findOne( { _id : req.query.id}).lean().exec();
        res.send({ user})
    }catch(err) {
        console.log(err)
    }
}