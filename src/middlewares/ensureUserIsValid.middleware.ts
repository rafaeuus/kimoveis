import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors";
import { IUserRequest } from "../interfaces/users.interfaces";

const ensureUserIsvalidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userData: IUserRequest = req.body;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const verify: User | null = await userRepository.findOneBy({
    name: userData.name,
  });

  if (verify) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export default ensureUserIsvalidMiddleware;
