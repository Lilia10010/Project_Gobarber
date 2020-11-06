import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm'

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // private appointments: Appoitment[];

  // constructor() {
  //   this.appointments = [];
  // }

  // public all(): Appoitment[] {
  //   return this.appointments;
  // }

  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );

    const findAppointment = await this.findOne({
      where: { date },
    })

    return findAppointment || null;
  }

  // public create({ provider, date }: CreateAppointmentDTO): Appoitment {
  //   const appointment = new Appoitment({ provider, date });

  //   this.appointments.push(appointment);

  //   return appointment;
  // }
}

export default AppointmentsRepository;
