import mongoose from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";

mongoose.Promise = Promise;

const { Schema } = mongoose;

const TodoSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false,
    required: true
  },
  timeOfCreation: {
    type: Number,
    required: true
  }
});

TodoSchema.plugin(beautifyUnique);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
