import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ServerService } from './services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;

  //  Inject form Builder to create LoginForm
  constructor(private fb: FormBuilder, private server: ServerService) { }

  ngOnInit(): void {
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
        if(query){
          alert('user logged in');
        } else {
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
