import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginClient } from 'src/models/loginclient.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {
  }

  public form: FormGroup;
	public loginclients: LoginClient[] = [];
	private ngZone:NgZone;
	private _router: Router;
	

	constructor(private fb: FormBuilder) {
		
		this.form = this.fb.group({
			name: ['', Validators.compose([
				Validators.minLength(5),
				Validators.maxLength(50),
				Validators.required,
			])],
			login: ['', Validators.compose([
				Validators.minLength(3),
				Validators.maxLength(8),
				Validators.required,
			])],
			password: ['', Validators.compose([
				Validators.minLength(3),
				Validators.maxLength(8),
				Validators.required,
			])],
		});

		this.load();
	}
 
	load() {
		const data = localStorage.getItem('loginclients');
		if (data) {
			this.loginclients = JSON.parse(data);
		} else {		
			this.loginclients = [];
		}
	}

	save() {
		const data = JSON.stringify(this.loginclients);
		localStorage.setItem('loginclients', data);
	}

	addLogin() {
		const id = this.loginclients.length + 1;
		const name = this.form.controls['name'].value;
		const login = this.form.controls['login'].value;
		const password = this.form.controls['password'].value;
    
		this.loginclients.push(new LoginClient(id, name, login, password));
		this.form.reset();
		this.save();
		
		//this.router.navigate([url]);
	}
 
}
