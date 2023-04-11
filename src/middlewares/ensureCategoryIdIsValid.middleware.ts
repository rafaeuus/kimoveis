import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";

const ensureCategoryIdIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const categoryId: number = parseInt(req.params.id);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const verify: Category | null = await categoryRepository.findOneBy({
    id: categoryId,
  });

  if (!verify) {
    throw new AppError("Category not found", 404);
  }

  return next();
};

export default ensureCategoryIdIsValidMiddleware;
