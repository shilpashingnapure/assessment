import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: { type: String },
  commentUserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    require: true,
  },
} , {
    timestamps : true
});

commentSchema.index( {
    comment : 'text'
})

const Comment = mongoose.model('comment' , commentSchema)
export default Comment;