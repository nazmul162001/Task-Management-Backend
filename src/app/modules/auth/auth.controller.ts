import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import { User } from "@prisma/client";
import httpStatus from "http-status";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.insertIntoDB(req.body);
  sendResponse<User>(res, {
    statusCode: httpStatus.CREATED,
    message: 'User created successfully',
    data: result,
    success: true,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {

  const result = await AuthService.login(req.body);

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    message: 'User signin successfully!',
    success: true,
    token: result,
  })
});

export const AuthController = {
  insertIntoDB,
  login,
};
