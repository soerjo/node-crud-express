import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import express, { Express, Request, Response } from "express";
import userController from "./user/user.controller";
import { mongooseconnection } from "./config/mongoose.config";

dotenv.config({ path: ".development.env" });

const app: Express = express();
const port: number = parseInt(process.env.PORT || "3000");
const mongodb_url: string = process.env.MONGODB_URL || "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

userController(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.listen(port, async () => {
  try {
    await mongooseconnection(mongodb_url);
    console.log(`Server running at http://localhost:${port}`);
  } catch (error: any) {
    console.error(error);
    process.exit(1);
  }
});
