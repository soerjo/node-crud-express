import mongoose from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
});

export default mongoose.model<IUser>("User", userSchema);
