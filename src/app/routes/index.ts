import express from 'express';
import { ServiceRoute } from '../modules/service/service.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/services',
    route: ServiceRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
