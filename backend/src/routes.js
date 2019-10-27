import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import OwnerController from './app/controllers/OwnerController';
import FoodTruckController from './app/controllers/FoodTruckController';
import MenuController from './app/controllers/MenuController';
import ScheduleController from './app/controllers/ScheduleController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/owners', OwnerController.index);
routes.post('/food-trucks', FoodTruckController.store);
routes.get('/food-trucks', FoodTruckController.index);
routes.delete('/food-trucks/:truckId', FoodTruckController.delete);

routes.get('/food-trucks/:truckId/menu', MenuController.index);
routes.post('/food-trucks/:truckId/menu', MenuController.store);
routes.delete('/food-trucks/:truckId/menu/:menuId', MenuController.delete);

routes.get('/food-trucks/:truckId/schedule', ScheduleController.index);
routes.post('/food-trucks/:truckId/schedule', ScheduleController.store);
routes.put(
  '/food-trucks/:truckId/schedule/:scheduleId',
  ScheduleController.update
);
routes.delete(
  '/food-trucks/:truckId/schedule/:scheduleId',
  ScheduleController.delete
);

routes.post('/files', upload.single('file'), FileController.store);
routes.delete('/files/:fileId', FileController.store);

export default routes;
