import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
