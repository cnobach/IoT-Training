import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from './services/server.service';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;

  //  Inject form Builder to create LoginForm
  constructor(
    private fb: FormBuilder,
    private server: ServerService,
    private primeNgConfig: PrimeNGConfig,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
  }

  //  Begin creation of the login form
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  //  On Submit function 
  //      For now just logs data, want to see what it looks like
  onSubmit() {
    this.submitted = true;

    console.log(JSON.stringify(this.loginForm.value));

    if(this.loginForm.invalid){
      return;
    } else {

      this.server.login(this.loginForm.value).subscribe(query => {
        if(query){ // If success - set userID in localstorage and route to home
          localStorage.setItem('userId', query.userId);
          this.router.navigate(['dashboard']);
        } else { // Else alert that it was incorrect
          alert('Incorrect Username/Password')
        }
      })

      this.onReset();
    }
  } 

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
}
