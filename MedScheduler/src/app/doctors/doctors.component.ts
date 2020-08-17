import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/models/doctor.model';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  ngOnInit(): void {
  }

  public form: FormGroup;
	public doctors: Doctor[] = [];

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			name: ['', Validators.compose([
				Validators.minLength(5),
				Validators.maxLength(50),
				Validators.required,
			])],
			expertise: ['', Validators.compose([
				Validators.minLength(5),
				Validators.maxLength(50),
				Validators.required,
			])]
		});

		this.load();
	}
 
	load() {
		const data = localStorage.getItem('doctors');
		if (data) {
			this.doctors = JSON.parse(data);
		} else {		
			this.doctors = [];
		}
	}

	save() {
		const data = JSON.stringify(this.doctors);
		localStorage.setItem('doctors', data);
	}

	addDoctor() {
		const id = this.doctors.length + 1;
		const name = this.form.controls['name'].value;
		const expertise = this.form.controls['expertise'].value;
		this.doctors.push(new Doctor(id, name, expertise));
		this.form.reset();
		this.save();
	}
 
	removeDoctor(doctor: Doctor) {
		const index = this.doctors.indexOf(doctor);
		if (index !== -1) {
			this.doctors.splice(index, 1);
		}
		this.save();
	}

}

