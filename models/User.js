import mongoose from "mongoose";
import beautifyUnique from "mongoose-beautiful-unique-validation";
import bcrypt from "bcrypt";

mongoose.Promise = Promise;

const { Schema } = mongoose;

mongoose.Types.ObjectId.isValid();

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imageLink: {
    type: String,
    default: "http://place-hold.it/100",
    required: true
  }
});

UserSchema.plugin(beautifyUnique);

UserSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, 2);
};

UserSchema.methods.checkPassword = async function(password) {
  const check = await bcrypt.compare(password, this.password);
  return check;
};

const User = mongoose.model("User", UserSchema);

export default User;
