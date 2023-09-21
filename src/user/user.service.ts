import { hashPassword } from "../util/bcrypt.util";
import { ICreateUserDto } from "./dto/create-user.dto";
import { IUser } from "./user.model";
import * as userRepository from "./user.repositories";

export interface IResponseService {
  status: number;
  message: string;
  data?: any;
}

export async function createUser(userdata: ICreateUserDto): Promise<IResponseService> {
  // is email already exist
  const isEmailExist = await userRepository.getUserByEmail(userdata.email);
  if (isEmailExist) return { status: 400, message: "email alreay exists" };

  // is username already exist
  const isUsernameExist = await userRepository.getUserByUsername(userdata.username);
  if (isUsernameExist) return { status: 400, message: "username alreay exists" };

  const user = await userRepository.saveUser(userdata);
  return { status: 201, message: "success", data: user };
}

export async function getAllUser(): Promise<IResponseService> {
  const users = await userRepository.getAllUser();
  return { status: 200, message: "success", data: users };
}

export async function getUserById(id: string): Promise<IResponseService> {
  const user = await userRepository.getUserById(id);
  return { status: 200, message: "success", data: user };
}

export async function updateUserById(id: string, userdata: ICreateUserDto): Promise<IResponseService> {
  const isUserIdExists = await userRepository.getUserById(id);
  if (!isUserIdExists) return { status: 400, message: "user is not found!" };

  isUserIdExists.username = userdata.username || isUserIdExists.username;
  isUserIdExists.email = userdata.email || isUserIdExists.email;
  isUserIdExists.password = userdata.password ? hashPassword(userdata.password) : isUserIdExists.password;

  const user = userRepository.updateUserById(isUserIdExists);
  return { status: 200, message: "success", data: user };
}

export async function deleteUserById(id: string): Promise<IResponseService> {
  const isUserIdExists = await userRepository.getUserById(id);
  if (!isUserIdExists) return { status: 400, message: "user is not found!" };

  userRepository.deleteUserById(isUserIdExists.id);

  return { status: 200, message: "success" };
}
