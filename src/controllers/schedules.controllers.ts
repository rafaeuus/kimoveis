import { Request, Response } from "express";
import { ICreateScheduleRequest } from "../interfaces/schedules.interfaces";
import createScheduleService from "../services/schedules/createSchedule.service";
import listAllSchedulesByPropertieService from "../services/schedules/listAllSchedulesByPropertie.service";

const createScheduleController = async (req: Request, res: Response) => {
  const isAdmin: boolean = req.token.admin;
  const userId: number = req.token.id;
  const scheduleData: ICreateScheduleRequest = req.body;

  await createScheduleService(isAdmin, userId, scheduleData);

  return res.status(201).json({
    message: "Schedule created",
  });
};

const listAllSchedulesByPropertieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const isAdmin: boolean = req.token.admin;
  const realEstateId: number = parseInt(req.params.id);

  const schedules = await listAllSchedulesByPropertieService(
    isAdmin,
    realEstateId
  );

  return res.json(schedules);
};

export { createScheduleController, listAllSchedulesByPropertieController };
