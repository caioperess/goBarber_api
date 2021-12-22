import { Router } from 'express';
import AppointmentsRoutes from './appointments.routes';
import SessionsRoutes from './sessions.routes';
import UserRoutes from './users.routes';

const routes = Router();

routes.use('/appointments', AppointmentsRoutes);
routes.use('/users', UserRoutes);
routes.use('/sessions', SessionsRoutes);

export default routes;
