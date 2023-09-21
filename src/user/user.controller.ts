import { Express, Request, Response } from "express";
import * as userService from "./user.service";

export default function userController(router: Express) {
  router.get("/user", async (req: Request, res: Response) => {
    const response = await userService.getAllUser();
    res.status(response.status || 200);
    res.send(response);
  });

  router.post("/user", async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    const response = await userService.createUser({ username, password, email });
    res.status(response.status || 200);
    res.send(response);
  });

  router.get("/user/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await userService.getUserById(id);
    res.status(response.status || 200);
    res.send(response);
  });

  router.patch("/user/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password, email } = req.body;

    const response = await userService.updateUserById(id, { username, password, email });
    res.status(response.status || 200);
    res.send(response);
  });

  router.delete("/user/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await userService.deleteUserById(id);
    res.status(response.status || 200);
    res.send(response);
  });
}
