import { Component, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import chips from '../../jsonData/chips.json'

@Component({
  selector: 'app-editing',
  templateUrl: './editing.page.html',
  styleUrls: ['./editing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class EditingPage implements OnInit{

 // loggedInPerson: any = {"Chips":["Rock","Pop","Action"],"ContactId":1,"PngPath":"https://images.unsplash.com/photo-1581382575275-97901c2635b7","Name":"Gary","Age":23}
  loggedInPerson: any;

  changeForm!: FormGroup;
  validationMessages: { Name: { type: string; message: string; }[]; Age: { type: string; message: string; }[]; } | undefined;

  musicGenre: string[] = chips.music;
  movieGenre: string[] = chips.movie;
  activity: string[] = chips.activity;

  constructor(public profileService: ProfileService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loggedInPerson = this.profileService.getMyProfile(); // super laggy
    //alert(JSON.stringify(this.loggedInPerson));
    this.changeForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(2)]],
      Age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      // Sound: ['', [Validators.required, Validators.minLength(1)]]
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
      'Age': [
        {
          type: 'required',
          message: 'Age is required.'
        },
        {
          type: 'min',
          message: 'Age most be greater than 0.'
        },
        {
          type: 'max',
          message: 'Age most be less than 100.'
        }
      ],
    }
  }

  saveChanges(){
    // push changes to firebase
    this.profileService.updateProfile(this.changeForm.value); /// NOT IMPLEMENTED
    alert(JSON.stringify(this.changeForm.value)); 
  }
}