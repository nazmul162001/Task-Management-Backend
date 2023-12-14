"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const todo_interface_1 = require("./todo.interface");
const createTodo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.todo.create({
        //@ts-ignore
        data,
    });
    return result;
});
// get single todo
const getSingleTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield prisma_1.default.todo.findUnique({
        where: {
            id,
        },
    });
    return todo;
});
// update todo
const updateTodo = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, data);
    const todo = yield prisma_1.default.todo.update({
        where: {
            id,
        },
        data,
    });
    return todo;
});
// delete todo
const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield prisma_1.default.todo.delete({
        where: {
            id,
        },
    });
    return todo;
});
// get all todo
const getAllTodo = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filtersData = __rest(filters, ["search"]);
    const andConditions = [];
    // search term
    if (search) {
        // console.log(search);
        andConditions.push({
            OR: todo_interface_1.TodoSearchAbleFields.map(field => ({
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
                    equals: filtersData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const todos = yield prisma_1.default.todo.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
            // createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.todo.count();
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
});
exports.TodoService = {
    createTodo,
    getAllTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo
};
