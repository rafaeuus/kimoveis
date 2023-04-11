import { z } from "zod";

const addressSchema = z.object({
  street: z.string(),
  zipCode: z.string().max(8),
  number: z.string().optional().nullable(),
  city: z.string(),
  state: z.string().max(2),
});

export { addressSchema };
