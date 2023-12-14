"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRoute = void 0;
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("./todo.controller");
const router = express_1.default.Router();
// user routes
router.get('/', todo_controller_1.TodoController.getAllTodo);
router.get('/:id', todo_controller_1.TodoController.getSingleTodo);
router.post('/create-todo', todo_controller_1.TodoController.createTodo);
router.patch('/:id', todo_controller_1.TodoController.updateTodo);
router.delete('/:id', todo_controller_1.TodoController.deleteTodo);
exports.TodoRoute = router;
