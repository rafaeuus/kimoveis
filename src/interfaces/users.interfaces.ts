import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  createUserSchema,
  returnAllUsersSchema,
  returnUserSchema,
  updateUserSchema,
} from "../schemas/users.schemas";

type IUserRequest = z.infer<typeof createUserSchema>;
type IUserResult = z.infer<typeof returnUserSchema>;
type IAllUsersResult = z.infer<typeof returnAllUsersSchema>;
type IUserUpdate = z.infer<typeof updateUserSchema>;
type IUserUpdateRequest = DeepPartial<IUserUpdate>;

export { IUserRequest, IUserResult, IAllUsersResult, IUserUpdateRequest };
