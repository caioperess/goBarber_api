import Appointment from '@models/Appointment';
import { startOfHour } from 'date-fns';
import AppError from 'src/errors/AppError';
import AppointmentsRepository from 'src/repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  provider_id: string;
  date: string;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(Date.parse(date));

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
