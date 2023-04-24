import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
import { Router, RouterModule } from '@angular/router';

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
  route: any;

  constructor(private router: Router, private profileService: ProfileService, private formBuilder: FormBuilder) { }

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
        this.loggedInPerson = data[0]
        if(this.loggedInPerson != undefined && data.length == 1){
          console.log("Lets login");
          console.log(this.loggedInPerson.ContactId);
          this.profileService.loginContact(this.loggedInPerson.ContactId);
          this.router.navigate([`./tabs/tab2`], { relativeTo: this.route });
        }
      },
      (error: any) => {
        console.log(error);

      });
  }

  navigate(){
    setTimeout(()=>{ this.router.navigate([`./tabs/tab2`], { relativeTo: this.route });}, 1000);
  }

}
