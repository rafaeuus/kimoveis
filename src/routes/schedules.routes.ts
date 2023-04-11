import { Router } from "express";
import {
  createScheduleController,
  listAllSchedulesByPropertieController,
} from "../controllers/schedules.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureDateAndHourIsvalidMiddleware from "../middlewares/ensureDateAndHourIsValid.middleware";
import ensureScheduleIsAvailableMiddleware from "../middlewares/ensureScheduleIsAvailable.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { createScheduleSchema } from "../schemas/schedules.schemas";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(createScheduleSchema),
  ensureDateAndHourIsvalidMiddleware,
  ensureScheduleIsAvailableMiddleware,
  createScheduleController
);
schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  listAllSchedulesByPropertieController
);

export default schedulesRoutes;
