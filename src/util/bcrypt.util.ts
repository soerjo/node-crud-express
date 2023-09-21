import bcrypt from "bcrypt";

const saltRounds = 10;

export function hashPassword(plaintextpassword: string) {
  return bcrypt.hashSync(plaintextpassword, saltRounds);
}

export function comparePassword(plaintextpassword: string, hashpassword: string) {
  return bcrypt.compareSync(plaintextpassword, hashpassword);
}
