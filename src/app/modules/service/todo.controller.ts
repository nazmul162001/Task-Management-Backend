import { Todo } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { TodoFilterAbleFields } from './todo.interface';
import { TodoService } from './todo.service';

const createTodo = catchAsync(async (req: Request, res: Response) => {
  const result = await TodoService.createTodo(req.body);
  sendResponse<Todo>(res, {
    statusCode: httpStatus.CREATED,
    message: 'Todo created successfully',
    data: result,
    success: true,
  });
});

// get all todo
const getAllTodo = catchAsync(async (req: Request, res: Response) => {
  // filters
  const filters = pick(req.query, TodoFilterAbleFields);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);

  const todo = await TodoService.getAllTodo(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Todos retrieved successfully',
    meta: todo.meta,
    data: todo.data,
  });
});

// get single todo
const getSingleTodo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await TodoService.getSingleTodo(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Todo retrieved successfully',
    data: todo,
  });
});

// update todo
const updateTodo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const todo = await TodoService.updateTodo(id, body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Todo updated successfully',
    data: todo,
  });
});

// delete todo
const deleteTodo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await TodoService.deleteTodo(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Todo deleted successfully',
    data: todo,
  });
});

export const TodoController = {
  createTodo,
  getAllTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
