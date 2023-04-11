import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { IAllCategoriesResult } from "../../interfaces/categories.interfaces";
import { returnAllCategoriesSchema } from "../../schemas/categories.schemas";

const listAllCategoriesService = async (): Promise<IAllCategoriesResult> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories: Category[] | null = await categoryRepository.find();

  const allCategories: IAllCategoriesResult =
    returnAllCategoriesSchema.parse(categories);

  return allCategories;
};

export default listAllCategoriesService;
