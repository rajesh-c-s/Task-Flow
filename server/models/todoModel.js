import mongoose, { Schema } from "mongoose";

/*-----------------todoSchema-----------------*/
const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true,
  },
});

export const todoModel = mongoose.model("Todo", todoSchema);
