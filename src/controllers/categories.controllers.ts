import { Request, Response } from "express";
import {
  IAllCategoriesResult,
  ICategoryRequest,
  ICategoryResult,
  ICategoryWithRealEstateResult,
} from "../interfaces/categories.interfaces";
import createCategoryService from "../services/categories/createCategory.service";
import listAllCategoriesService from "../services/categories/listAllCategories.service";
import listAllPropertiesByIdService from "../services/categories/listAllPropertiesById.service";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const isAdmin: boolean = req.token.admin;
  const categoryData: ICategoryRequest = req.body;

  const newCategory: ICategoryResult = await createCategoryService(
    isAdmin,
    categoryData
  );

  return res.status(201).json(newCategory);
};

const listAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allCategories: IAllCategoriesResult = await listAllCategoriesService();

  return res.json(allCategories);
};

const listAllPropertiesByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = parseInt(req.params.id);

  const category: ICategoryWithRealEstateResult =
    await listAllPropertiesByIdService(categoryId);

  return res.json(category);
};

export {
  createCategoryController,
  listAllCategoriesController,
  listAllPropertiesByIdController,
};
