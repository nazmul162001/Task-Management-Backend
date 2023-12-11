import { Prisma, Service } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  IPriceFilters,
  IServiceFilterRequest,
  ServiceSearchAbleFields,
} from './service.interface';

const createService = async (data: Service): Promise<Service> => {
  const result = await prisma.service.create({
    //@ts-ignore
    data,
  });
  return result;
};

// get single service
const getSingleService = async (id: string) => {
  const service = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      reviews: {
        include: {
          user: true,
          service: true,
        },
      },
    },
  });
  return service;
};

// update service
const updateService = async (
  id: string,
  data: Partial<Service>
): Promise<Service | null> => {
  console.log(id, data);
  const service = await prisma.service.update({
    where: {
      id,
    },
    data,
  });
  return service;
};

// delete service
const deleteService = async (id: string) => {
  const service = await prisma.service.delete({
    where: {
      id,
    },
  });
  return service;
};

// get all books
const getAllService = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions,
  priceQuery: IPriceFilters
): Promise<IGenericResponse<Service[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filtersData } = filters;

  const andConditions = [];

  // price query

  if (priceQuery.minPrice !== undefined && priceQuery.maxPrice !== undefined) {
    const minPrice = Number(priceQuery.minPrice);
    const maxPrice = Number(priceQuery.maxPrice);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      andConditions.push({
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      });
    }
  } else if (priceQuery.minPrice !== undefined) {
    const minPrice = Number(priceQuery.minPrice);

    if (!isNaN(minPrice)) {
      andConditions.push({
        price: {
          gte: minPrice,
        },
      });
    }
  } else if (priceQuery.maxPrice !== undefined) {
    const maxPrice = Number(priceQuery.maxPrice);

    if (!isNaN(maxPrice)) {
      andConditions.push({
        price: {
          lte: maxPrice,
        },
      });
    }
  }

  // search term

  if (search) {
    // console.log(search);
    andConditions.push({
      OR: ServiceSearchAbleFields.map(field => ({
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

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const books = await prisma.service.findMany({
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

  // include: {
  //   category: true,
  //   reviews: true,
  //   orderBooks: true,
  // },

  const total = await prisma.service.count();
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      total,
      page,
      size,
      totalPage,
    },
    data: books,
  };
};

export const InternetService = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
