import { z } from "zod";
import {
  categoryResultSchema,
  categoryResultWithRealEstateSchema,
  createCategorySchema,
  returnAllCategoriesSchema,
} from "../schemas/categories.schemas";

type ICategoryRequest = z.infer<typeof createCategorySchema>;
type ICategoryResult = z.infer<typeof categoryResultSchema>;
type IAllCategoriesResult = z.infer<typeof returnAllCategoriesSchema>;
type ICategoryWithRealEstateResult = z.infer<
  typeof categoryResultWithRealEstateSchema
>;

export {
  ICategoryRequest,
  ICategoryResult,
  IAllCategoriesResult,
  ICategoryWithRealEstateResult,
};
