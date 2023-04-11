import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import {
  ICategoryRequest,
  ICategoryResult,
} from "../../interfaces/categories.interfaces";
import { categoryResultSchema } from "../../schemas/categories.schemas";

const createCategoryService = async (
  isAdmin: boolean,
  categoryData: ICategoryRequest
): Promise<ICategoryResult> => {
  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category = categoryRepository.create(categoryData);

  await categoryRepository.save(category);

  const newCategory: ICategoryResult = categoryResultSchema.parse(category);

  return newCategory;
};

export default createCategoryService;
