import { Router } from "express";
import {
  createRealEstateController,
  listAllRealEstatesController,
} from "../controllers/realEstate.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { realEstateRequestSchema } from "../schemas/realEstate.schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(realEstateRequestSchema),
  createRealEstateController
);
realEstateRoutes.get("", listAllRealEstatesController);

export default realEstateRoutes;
