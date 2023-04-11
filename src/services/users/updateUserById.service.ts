import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import {
  IUserResult,
  IUserUpdateRequest,
} from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

const updateUserByIdService = async (
  isAdmin: boolean,
  userOwnerId: number,
  userId: number,
  userData: IUserUpdateRequest
): Promise<IUserResult> => {
  if (!isAdmin && userId !== userOwnerId) {
    throw new AppError("Insufficient permission", 403);
  }

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepository.findOneBy({
    id: userId,
  });

  const user: User = userRepository.create({
    ...oldUserData,
    ...userData,
  });

  await userRepository.save(user);

  const updatedUser: IUserResult = returnUserSchema.parse(user);

  return updatedUser;
};

export default updateUserByIdService;
