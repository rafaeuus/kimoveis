import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";

const ensureCategoryIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const categoryRespository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category | null = await categoryRespository.findOneBy({
    name: req.body.name,
  });

  if (category) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};

export default ensureCategoryIsValidMiddleware;
