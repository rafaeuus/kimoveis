import { Request, Response } from "express";
import {
  IAllUsersResult,
  IUserRequest,
  IUserResult,
  IUserUpdateRequest,
} from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import deleteUserByIdService from "../services/users/deleteUserById.service";
import listAllUsersService from "../services/users/listAllUsers.service";
import updateUserByIdService from "../services/users/updateUserById.service";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserRequest = req.body;

  const newUser: IUserResult = await createUserService(userData);

  return res.status(201).json(newUser);
};

const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const isAdmin: boolean = req.token.admin;

  const users: IAllUsersResult = await listAllUsersService(isAdmin);

  return res.json(users);
};

const updateUserByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const isAdmin: boolean = req.token.admin;
  const userOwnerId: number = req.token.id;
  const userId: number = parseInt(req.params.id);
  const userData: IUserUpdateRequest = req.body;

  const updatedUser: IUserResult = await updateUserByIdService(
    isAdmin,
    userOwnerId,
    userId,
    userData
  );

  return res.status(200).json(updatedUser);
};

const deleteUserByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const isAdmin: boolean = req.token.admin;
  const userId: number = parseInt(req.params.id);

  await deleteUserByIdService(userId, isAdmin);

  return res.status(204).send();
};

export {
  createUserController,
  listAllUsersController,
  updateUserByIdController,
  deleteUserByIdController,
};
