import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    bio: { type: String, required: true },
    description: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

//     status: { type: String, enum: ["pending", "done"], default: "pending" },
// Create indexes to optimize post searches

// const Post = mongoose.model("Post", postSchema);
// Post.createIndexes( {title:1, user:1});
postSchema.index({ title: 1 });
postSchema.index({ user: 1 });

const Post = mongoose.model("Post", postSchema);
export default Post;

