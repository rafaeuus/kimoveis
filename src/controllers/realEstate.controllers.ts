import { Request, Response } from "express";
import {
  IAllRealEstatesResult,
  IRealEstateRequest,
  IRealEstateResult,
} from "../interfaces/realEstate.interfaces";
import createRealEstateService from "../services/realEstate/createRealEstate.service";
import listAllRealEstatesService from "../services/realEstate/listAllRealEstates.service";

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateData: IRealEstateRequest = req.body;
  const isAdmin: boolean = req.token.admin;

  const newRealEstate = await createRealEstateService(isAdmin, realEstateData);

  return res.status(201).json(newRealEstate);
};

const listAllRealEstatesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstates = await listAllRealEstatesService();

  return res.json(realEstates);
};

export { createRealEstateController, listAllRealEstatesController };
