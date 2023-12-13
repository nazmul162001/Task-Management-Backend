import express from 'express';
import { TodoController } from './todo.controller';
const router = express.Router();

// user routes
router.get('/', TodoController.getAllTodo);
router.get('/:id', TodoController.getSingleTodo);
router.post('/create-todo', TodoController.createTodo);
router.patch('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

export const TodoRoute = router;
