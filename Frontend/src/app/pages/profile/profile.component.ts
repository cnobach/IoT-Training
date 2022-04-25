import { Component, OnInit } from '@angular/core';
import { ServerService } from './services/server.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  view: Boolean = true;

  constructor(private server: ServerService, 
    private fb: FormBuilder, 
    private primeNgConfig: PrimeNGConfig,
    private toastr: NotificationService
    ) { }

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;

    this.server.getUser(localStorage.getItem('userId')).subscribe(data => {
      this.user = data.message[0];
    })
  }

  // Edit form
  editForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required]
  })

  get f(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  editMode(){

    this.editForm.controls['name'].setValue(this.user.name);
    this.editForm.controls['email'].setValue(this.user.email);
    this.editForm.controls['address'].setValue(this.user.address);
    this.editForm.controls['city'].setValue(this.user.city);
    this.editForm.controls['state'].setValue(this.user.state);
    this.editForm.controls['zip'].setValue(this.user.zip);

    this.view = false;
  }

  onSubmit() {
    let obj = this.editForm.value;
    obj.password = this.user.password;
    obj.id = this.user.id;
    
    this.server.updateUser(obj).subscribe(ret => {
      this.user = ret[0];
      this.toastr.success('Your information has been updated.', 'Success');      this.view = true;
    })
  }

  onReset(){
    this.toastr.info('Your information has not been changed.', 'Action Cancelled');
    this.view=true;
  }

}
