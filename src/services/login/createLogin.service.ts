import { compare } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { ILoginRequest } from "../../interfaces/login.interfaces";
import jwt from "jsonwebtoken";

const createLoginService = async (userData: ILoginRequest): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: userData.email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const verifyPassword: boolean = await compare(
    userData.password,
    user.password
  );

  if (!verifyPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );

  return token;
};

export default createLoginService;
