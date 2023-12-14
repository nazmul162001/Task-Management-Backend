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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const todo_interface_1 = require("./todo.interface");
const todo_service_1 = require("./todo.service");
const createTodo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield todo_service_1.TodoService.createTodo(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: 'Todo created successfully',
        data: result,
        success: true,
    });
}));
// get all todo
const getAllTodo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // filters
    const filters = (0, pick_1.default)(req.query, todo_interface_1.TodoFilterAbleFields);
    const options = (0, pick_1.default)(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
    const todo = yield todo_service_1.TodoService.getAllTodo(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Todos retrieved successfully',
        meta: todo.meta,
        data: todo.data,
    });
}));
// get single todo
const getSingleTodo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield todo_service_1.TodoService.getSingleTodo(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Todo retrieved successfully',
        data: todo,
    });
}));
// update todo
const updateTodo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const todo = yield todo_service_1.TodoService.updateTodo(id, body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Todo updated successfully',
        data: todo,
    });
}));
// delete todo
const deleteTodo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const todo = yield todo_service_1.TodoService.deleteTodo(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Todo deleted successfully',
        data: todo,
    });
}));
exports.TodoController = {
    createTodo,
    getAllTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo,
};
