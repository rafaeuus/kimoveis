import { Router } from "express";
import {
  createUserController,
  deleteUserByIdController,
  listAllUsersController,
  updateUserByIdController,
} from "../controllers/users.controllers";

import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureIdIsValidMiddleware from "../middlewares/ensureIdIsValid.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserIsvalidMiddleware from "../middlewares/ensureUserIsValid.middleware";
import {
  createUserSchema,
  updateUserVerifySchema,
} from "../schemas/users.schemas";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSchema),
  ensureUserIsvalidMiddleware,
  createUserController
);
usersRoutes.get("", ensureTokenIsValidMiddleware, listAllUsersController);
usersRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateUserVerifySchema),
  ensureIdIsValidMiddleware,
  ensureTokenIsValidMiddleware,
  updateUserByIdController
);
usersRoutes.delete(
  "/:id",
  ensureIdIsValidMiddleware,
  ensureTokenIsValidMiddleware,
  deleteUserByIdController
);

export default usersRoutes;
