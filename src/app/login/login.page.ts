import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule
  ],
})
export class LoginPage implements OnInit {

  loggedInPerson: any; 

  name = "";
  telephone = "";

  loginForm!: FormGroup;
  validationMessages: { Name: { type: string; message: string; }[]; Telephone: { type: string; message: string; }[]; } | undefined;

  constructor(private profileService: ProfileService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(2)]],
      Telephone: ['', [Validators.required, Validators.pattern(" ^[\+]?[(]?[8]{3}[)]?[-\s\.]?[8]{3}[-\s\.]?[8]{4,6}$ ")]]
    });

    this.validationMessages = {
      'Name': [
        {
          type: 'required',
          message: 'Name is required.'
        },
        {
          type: 'minlength',
          message: 'Name requires minimum 2 characters.'
        }
      ],
      'Telephone': [
        {
          type: 'required',
          message: 'Telephone number is required.'
        },
        {
          type: 'pattern',
          message: 'Telephone requires 8 numbers.'
        }
      ],
    }
  }

  login(){
    // check if phone nr exist in database
    this.profileService.getContactByTelephone(this.loginForm.value.Telephone)
    .subscribe(
      (data: any) => {
        this.loggedInPerson = data
        console.log(this.loggedInPerson);
        if(this.loggedInPerson != undefined && this.loggedInPerson.length > 0){
          console.log("Lets login");
          this.profileService.loginContact(this.loggedInPerson.ContactId);
          // go to admin page? or just show button to admin page when admin?
          
        }
      },
      (error: any) => {
        console.log(error);
      });

  }

}
