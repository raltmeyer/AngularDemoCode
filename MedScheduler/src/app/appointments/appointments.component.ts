import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Appointment } from 'src/models/appointment.model';
import { Doctor } from 'src/models/doctor.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  ngOnInit(): void {
  }
  
  public form: FormGroup;
	public appointments: Appointment[] = [];
	public doctors: Doctor[] = [];

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			title: ['', Validators.compose([
				Validators.minLength(5),
				Validators.maxLength(50),
				Validators.required,
			])]
		});

		this.load();
	}
 
	load() {
		const data = localStorage.getItem('appointments');
		if (data) {
			this.appointments = JSON.parse(data);
		} else {		
			this.appointments = [];
		}
		const dataDoctor = localStorage.getItem('doctors');
		if (dataDoctor) {
			this.doctors = JSON.parse(dataDoctor);
		} else {		
			this.doctors = [];
		}
	}

	save() {
		const data = JSON.stringify(this.appointments);
		localStorage.setItem('appointments', data);
	}

	addAppointment() {
		const id = this.appointments.length + 1;
		const title = this.form.controls['title'].value;
		this.appointments.push(new Appointment(id, title, "", false));
		this.form.reset();
		this.save();
	}
 
	removeAppointment(appointment: Appointment) {
		const index = this.appointments.indexOf(appointment);
		if (index !== -1) {
			this.appointments.splice(index, 1);
		}
		this.save();
	}

	markAsDone(appointment: Appointment) {
		appointment.done = true;
		this.save();
	}

}
