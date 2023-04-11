import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  password: z.string().max(120),
});

const updateUserSchema = createUserSchema.omit({ admin: true });

const returnUserSchema = createUserSchema
  .extend({
    id: z.number().int(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({
    password: true,
  });

const returnAllUsersSchema = returnUserSchema.array();

const updateUserVerifySchema = updateUserSchema.partial();

export {
  createUserSchema,
  returnUserSchema,
  returnAllUsersSchema,
  updateUserSchema,
  updateUserVerifySchema,
};
