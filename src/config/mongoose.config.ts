import mongoose from "mongoose";

export async function mongooseconnection(url: string) {
  try {
    console.log("do connection to mongodb...");
    await mongoose.connect(url);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
