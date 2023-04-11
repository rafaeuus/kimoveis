import { Request, Response } from "express";
import { ILoginRequest } from "../interfaces/login.interfaces";
import createLoginService from "../services/login/createLogin.service";

const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: ILoginRequest = req.body;

  const token: string = await createLoginService(userData);

  return res.json({
    token: token,
  });
};

export { createLoginController };
