import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  res.send("Login successful");
};

export const dashboard = (req: Request, res: Response) => {
  res.send("Welcome to the dashboard");
};
