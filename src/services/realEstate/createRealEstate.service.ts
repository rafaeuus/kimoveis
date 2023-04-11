import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import {
  IRealEstateRequest,
  IRealEstateResult,
} from "../../interfaces/realEstate.interfaces";
import { realEstateSchema } from "../../schemas/realEstate.schemas";

const createRealEstateService = async (
  isAdmin: boolean,
  realEstateData: IRealEstateRequest
) => {
  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const address: Address = addressRepository.create(realEstateData.address);

  const verifyAddress: Address | null = await addressRepository.findOne({
    where: {
      city: realEstateData.address.city,
      state: realEstateData.address.state,
      street: realEstateData.address.street,
      zipCode: realEstateData.address.zipCode,
    },
  });

  if (verifyAddress) {
    throw new AppError("Address already exists", 409);
  }

  await addressRepository.save(address);

  const category: Category | null = await categoryRepository.findOneBy({
    id: realEstateData.categoryId,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const realEstate: RealEstate = realEstateRepository.create({
    ...realEstateData,
    category,
    address,
  });

  await realEstateRepository.save(realEstate);

  return realEstate;
};

export default createRealEstateService;
