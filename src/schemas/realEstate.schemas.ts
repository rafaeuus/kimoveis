import { z } from "zod";
import { addressSchema } from "./addresses.schemas";

const realEstateRequestSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().gt(0),
  categoryId: z.number(),
  address: addressSchema,
});

const realEstateSchema = realEstateRequestSchema.extend({
  id: z.number().int(),
  sold: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const realEstateResultSchema = realEstateSchema.omit({
  address: true,
  categoryId: true,
});

const allRealEstatesSchema = realEstateResultSchema.array();

export {
  realEstateSchema,
  realEstateRequestSchema,
  realEstateResultSchema,
  allRealEstatesSchema,
};
