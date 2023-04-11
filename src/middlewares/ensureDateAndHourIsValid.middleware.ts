import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureDateAndHourIsvalidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const scheduleData = req.body;

  const strings = scheduleData.hour.split(":");

  if (parseInt(strings[0]) < 8 || parseInt(strings[0]) > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const date = new Date(scheduleData.date);

  const weekDay = date.getDay();

  if (weekDay > 5 || weekDay < 1) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  return next();
};

export default ensureDateAndHourIsvalidMiddleware;
