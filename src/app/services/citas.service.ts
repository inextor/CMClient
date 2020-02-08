import { Injectable } from '@angular/core';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { RestService } from './rest.service';
import { Cita } from '../models/Modelos';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private disponibilidadDoctorSource = new BehaviorSubject([]);
  disponibilidadDoctor = this.disponibilidadDoctorSource.asObservable();

  private horarioDoctorSource = new BehaviorSubject([]);
  horarioDoctor = this.horarioDoctorSource.asObservable();

  constructor(private restService:RestService) {
  }

  setDisponibilidadDoctor(idDoctor, idCentroMedico, disponibilidadDoctor){
    const horarioDoctor = disponibilidadDoctor.map(event => ({
      id_centro_medico: idCentroMedico,
      hora_inicio: event.startTime,
      hora_final: event.endTime,
      dia_semana: parseInt(event.daysOfWeek[0])
    }));

	  //this.restService.horario_doctor.create({ id_doctor: idDoctor, id_centro_medico: idCentroMedico,

	  //this.restService.doctor.horario.create(idDoctor, idCentroMedico, horarioDoctor).subscribe( r =>
	this.restService.guardarHorarioDoctor(idDoctor, idCentroMedico, horarioDoctor).subscribe( r =>
      this.disponibilidadDoctorSource.next(r)
    );
  }

  getDisponibilidadDoctor(idDoctor, idCentroMedico) {
    console.log('id_doctor',idDoctor);
    console.log('id_cm',idCentroMedico);
    return this.restService.horario_doctor.getAll({ id_centro_medico:idCentroMedico },{id_doctor:idDoctor});
	//return this.restService.doctor.horario.get(idDoctor, idCentroMedico);
  }

  setCitaDoctor(cita: Cita){
    let horarioDoctor = null
    this.restService.cita.create(cita).subscribe(response => {
      this.disponibilidadDoctor.subscribe(events => {
        horarioDoctor = events.slice();
        horarioDoctor.push(cita);
      })
    })
    this.horarioDoctorSource.next(horarioDoctor);
  }

  getHorarioDoctor(idDoctor, idCentroMedico){
	return this.restService.searchCita.getAll({ id_doctor: idDoctor, id_centro_medico: idCentroMedico });
	  //return this.restService.doctor.agenda.get(idDoctor, idCentroMedico);
  }
  getCitasPaciente(idPaciente, idCentroMedico){
    return this.restService.searchCita.getAll({ id_paciente: idPaciente, id_centro_medico: idCentroMedico });
      //return this.restService.doctor.agenda.get(idDoctor, idCentroMedico);
    }

}
