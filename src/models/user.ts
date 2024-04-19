import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  name: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;

UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};
