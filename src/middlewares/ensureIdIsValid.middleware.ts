import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors";

const ensureIdIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId: number = parseInt(req.params.id);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const verify: User | null = await userRepository.findOneBy({
    id: userId,
  });

  if (!verify) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default ensureIdIsValidMiddleware;
