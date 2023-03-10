import mongoose from "mongoose";

const Conversation = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("conversation", Conversation);
