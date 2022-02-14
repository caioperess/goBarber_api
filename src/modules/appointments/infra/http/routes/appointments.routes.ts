import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import AppointmentController from '../controllers/AppointmentController';

const AppointmentsRoutes = Router();
const appointmentsController = new AppointmentController();

AppointmentsRoutes.use(ensureAuthenticated);

// AppointmentsRoutes.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

AppointmentsRoutes.post('/', appointmentsController.create);

export default AppointmentsRoutes;
