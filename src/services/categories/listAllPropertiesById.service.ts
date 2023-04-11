import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { ICategoryWithRealEstateResult } from "../../interfaces/categories.interfaces";
import { categoryResultWithRealEstateSchema } from "../../schemas/categories.schemas";
import { realEstateResultSchema } from "../../schemas/realEstate.schemas";

const listAllPropertiesByIdService = async (
  categoryId: number
): Promise<ICategoryWithRealEstateResult> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category | null = await categoryRepository.findOne({
    where: {
      id: categoryId,
    },
    relations: {
      realEstate: true,
    },
  });

  const categoryResult: ICategoryWithRealEstateResult =
    categoryResultWithRealEstateSchema.parse(category);

  return categoryResult;
};

export default listAllPropertiesByIdService;
