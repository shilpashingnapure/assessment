import Comment from "../model/comment_model.js"
import Post from "../model/post_model.js"
import { User } from "../model/user_model.js"

export const feeds = async (req , res) => {
    let data = await Post.find().populate('userId').sort({
        'createdAt' : -1
    })

    res.send({ data , total : data.length })
}

export const createFeed = async (req , res) => {
    let post = await Post.create(req.body)
    res.send({ post , status : 200})
}



export const searchRes = async (req , res) => {
    let search = req.query.text
    await Post.createIndexes()
    await Comment.createIndexes()

    let data = await Post.find({ $text : { $search : search }}).populate('userId');

    let data1 = await Comment.find({ $text : { $search : search}}).populate({ path : 'postID' , populate : {
        path : 'userId' ,
        model : User
    }})


    let commentPosts = data1.map((item) => item.postID)
    let result = [...data , ...commentPosts]
    res.send(result)
}