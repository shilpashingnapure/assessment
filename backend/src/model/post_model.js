import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    msg: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    }
  },
  { timestamps: true }
);

postSchema.index({
    msg : 'text' , 

})

const Post = mongoose.model("post", postSchema);
export default Post;
