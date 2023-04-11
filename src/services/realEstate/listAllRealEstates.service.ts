import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { IAllRealEstatesResult } from "../../interfaces/realEstate.interfaces";
import { allRealEstatesSchema } from "../../schemas/realEstate.schemas";

const listAllRealEstatesService = async () => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstates = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  const allRealEstates: IAllRealEstatesResult =
    allRealEstatesSchema.parse(realEstates);

  return realEstates;
};

export default listAllRealEstatesService;
