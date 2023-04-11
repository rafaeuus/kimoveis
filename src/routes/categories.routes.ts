import { Router } from "express";
import {
  createCategoryController,
  listAllCategoriesController,
  listAllPropertiesByIdController,
} from "../controllers/categories.controllers";
import ensureCategoryIdIsValidMiddleware from "../middlewares/ensureCategoryIdIsValid.middleware";
import ensureCategoryIsValidMiddleware from "../middlewares/ensureCategoryIsValid.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureCategoryIsValidMiddleware,
  ensureTokenIsValidMiddleware,
  createCategoryController
);
categoriesRoutes.get("", listAllCategoriesController);
categoriesRoutes.get(
  "/:id/realEstate",
  ensureCategoryIdIsValidMiddleware,
  listAllPropertiesByIdController
);

export default categoriesRoutes;
