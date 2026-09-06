import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const postModel = mongoose.model("posts", postSchema);

export default postModel;
