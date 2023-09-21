import { hashPassword } from "../util/bcrypt.util";
import { ICreateUserDto } from "./dto/create-user.dto";
import User, { IUser } from "./user.model";

export async function getAllUser() {
  return await User.find().select("-password");
}

export async function getUserByUsername(username: string) {
  return await User.findOne({ username });
}
export async function getUserByEmail(email: string) {
  return await User.findOne({ email });
}

export async function saveUser(userdata: ICreateUserDto) {
  userdata.password = hashPassword(userdata.password);
  const user = await new User(userdata).save();
  return { username: user.username, email: user.email };
}

export async function getUserById(id: string) {
  return await User.findById(id);
}

export async function updateUserById(userdata: IUser) {
  return await User.create(userdata);
}

export async function deleteUserById(id: string) {
  return await User.deleteOne({ _id: id });
}
