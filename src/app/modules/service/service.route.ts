import express from 'express';
import { InternetServiceController } from './service.controller';
const router = express.Router();

// user routes
router.get('/', InternetServiceController.getAllService);
router.get('/:id', InternetServiceController.getSingleService);
router.post('/create-service', InternetServiceController.createService);
router.patch('/:id', InternetServiceController.updateService);
router.delete('/:id', InternetServiceController.deleteService);

export const ServiceRoute = router;
