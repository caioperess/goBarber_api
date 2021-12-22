import AppointmentsRepository from 'src/repositories/AppointmentsRepository';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from 'src/services/CreateAppointmentService';
import ensureAuthenticated from '@middlewares/ensureAuthenticate';

const AppointmentsRoutes = Router();

AppointmentsRoutes.use(ensureAuthenticated);

AppointmentsRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

AppointmentsRoutes.post('/', async (request, response) => {
  const createAppointment = new CreateAppointmentService();
  const appointment = await createAppointment.execute(request.body);

  return response.json(appointment);
});

export default AppointmentsRoutes;
