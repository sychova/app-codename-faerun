import mongoose from "mongoose";

const { Schema } = mongoose;

const TaskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Message text is required"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
