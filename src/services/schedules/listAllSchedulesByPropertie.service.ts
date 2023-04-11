import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../errors";

const listAllSchedulesByPropertieService = async (
  isAdmin: boolean,
  realEstateId: number
) => {
  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate = await realEstateRepository.findOneBy({ id: realEstateId });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const schedules = realEstateRepository
    .createQueryBuilder("real_estate")
    .select(["real_estate", "schedules", "address", "user", "category"])
    .innerJoin("real_estate.schedules", "schedules")
    .innerJoin("schedules.user", "user")
    .innerJoin("real_estate.address", "address")
    .innerJoin("real_estate.category", "category")
    .where("real_estate.id = :realEstateId", { realEstateId: realEstateId })
    .getOne();

  return schedules;
};

export default listAllSchedulesByPropertieService;
