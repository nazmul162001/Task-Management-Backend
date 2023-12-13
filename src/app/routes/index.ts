import express from 'express';
import { TodoRoute } from '../modules/service/todo.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/todos',
    route: TodoRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
