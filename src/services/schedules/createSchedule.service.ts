import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { ICreateScheduleRequest } from "../../interfaces/schedules.interfaces";

const createScheduleService = async (
  isAdmin: boolean,
  userId: number,
  scheduleData: ICreateScheduleRequest
) => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const user = await userRepository.findOneBy({ id: userId });

  const realEstate = await realEstateRepository.findOneBy({
    id: scheduleData.realEstateId,
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const schedule = scheduleRepository.create({
    ...scheduleData,
    realEstate: realEstate!,
    user: user!,
  });

  await scheduleRepository.save(schedule);
};

export default createScheduleService;
