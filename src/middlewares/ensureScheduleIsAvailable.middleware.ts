import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RealEstate, Schedule, User } from "../entities";
import { AppError } from "../errors";
import { ICreateScheduleRequest } from "../interfaces/schedules.interfaces";

const ensureScheduleIsAvailableMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId: number = req.token.id;
  const isAdmin: boolean = req.token.admin;

  const scheduleData: ICreateScheduleRequest = req.body;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate = await realEstateRepository.findOneBy({
    id: scheduleData.realEstateId,
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const user = await userRepository.findOneBy({ id: userId });

  const schedule = await scheduleRepository.findOne({
    where: {
      hour: scheduleData.hour,
      date: scheduleData.date,
    },
    relations: {
      user: true,
      realEstate: true,
    },
  });

  if (schedule) {
    throw new AppError(
      `${
        schedule.user.id === user!.id ? "User s" : "S"
      }chedule to this real estate at this date and time already exists`,
      409
    );
  }

  return next();
};

export default ensureScheduleIsAvailableMiddleware;
