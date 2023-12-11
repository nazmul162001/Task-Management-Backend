import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const isUserExist = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return !!user;
};

const insertIntoDB = async (data: User): Promise<User> => {
  const userExists = await isUserExist(data.email);

  if (userExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'User Already Exists, Please login.'
    );
  }

  const result = await prisma.user.create({
    data,
  });

  return result;
};

const login = async (data: Partial<User>): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.password !== data.password) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Incorrect Credentials');
  }

  const result = jwtHelpers.createToken(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    '1y'
  );

  return result;
};

export const AuthService = {
  insertIntoDB,
  login,
  isUserExist,
};
