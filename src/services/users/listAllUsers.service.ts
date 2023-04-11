import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { IAllUsersResult } from "../../interfaces/users.interfaces";
import { returnAllUsersSchema } from "../../schemas/users.schemas";

const listAllUsersService = async (
  isAdmin: boolean
): Promise<IAllUsersResult> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  let users: User[] | IAllUsersResult = await userRepository.find();

  users = returnAllUsersSchema.parse(users);

  return users;
};

export default listAllUsersService;
