import { z } from "zod";
import { realEstateResultSchema } from "./realEstate.schemas";

const createCategorySchema = z.object({
  name: z.string().max(45),
});

const categoryResultSchema = createCategorySchema.extend({
  id: z.number().int(),
});

const returnAllCategoriesSchema = categoryResultSchema.array();

const categoryResultWithRealEstateSchema = categoryResultSchema.extend({
  realEstate: realEstateResultSchema.array(),
});

export {
  createCategorySchema,
  categoryResultSchema,
  returnAllCategoriesSchema,
  categoryResultWithRealEstateSchema,
};
