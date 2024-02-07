import Comment from "../model/comment_model.js"
import Post from "../model/post_model.js"

export const createComment = async (req , res) => {
    let comment = await Comment.create(req.body)
    res.send({ comment , stauts : 200})
}

export const comments = async (req , res) => {
    let comments = await Comment.find( { postID : req.query.postId}).populate('commentUserID').sort({
        'createdAt' : -1
    })
    res.send(comments)
}