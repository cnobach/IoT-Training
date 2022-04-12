import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ServerService } from './services/server.service';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private server: ServerService,
    private primeNgConfig: PrimeNGConfig ,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }

  // Creating register form
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confPass: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
  }, {validators: this.confirmValidator()})

  //  Confirm password validator
  confirmValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let error = null;
      if(control.value.password !== control.value.confPass){
        error = {"confirmError": true};
      }
      return error;
    }
  }

  // Register function
  register() {
    this.submitted = true;

    console.log(JSON.stringify(this.registerForm.value));

    if(this.registerForm.invalid){
      return;
    } else {

      this.server.register(this.registerForm.value).subscribe(query => {
        if(query){
          alert('user created, routing to log in');
          this.router.navigate(['login'])
        } else {
          alert('user not created')
        }
      })

      // this.onReset();
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  get f(): { [key: string]: AbstractControl} {
    return this.registerForm.controls;
  }

}
