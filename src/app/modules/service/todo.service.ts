import { Prisma, Todo } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ITodoFilterRequest, TodoSearchAbleFields } from './todo.interface';

const createTodo = async (data: Todo): Promise<Todo> => {
  const result = await prisma.todo.create({
    //@ts-ignore
    data,
  });
  return result;
};

// get single todo
const getSingleTodo = async (id: string) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  return todo;
};

// update todo
const updateTodo = async (
  id: string,
  data: Partial<Todo>
): Promise<Todo | null> => {
  console.log(id, data);
  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data,
  });
  return todo;
};

// delete todo
const deleteTodo = async (id: string) => {
  const todo = await prisma.todo.delete({
    where: {
      id,
    },
  });
  return todo;
};

// get all todo
const getAllTodo = async (
  filters: ITodoFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Todo[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filtersData } = filters;

  const andConditions = [];

  // search term

  if (search) {
    // console.log(search);
    andConditions.push({
      OR: TodoSearchAbleFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.TodoWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const todos = await prisma.todo.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            // createdAt: 'desc',
          },
  });


  const total = await prisma.todo.count();
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: todos,
  };
};

export const TodoService = {
  createTodo,
  getAllTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo
};
