import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import chipsData from '../../jsonData/chips.json';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.page.html',
  styleUrls: ['./editing.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class EditingPage implements OnInit {
  // loggedInPerson: any = {"Chips":["Rock","Pop","Action"],"ContactId":1,"PngPath":"https://images.unsplash.com/photo-1581382575275-97901c2635b7","Name":"Gary","Age":23}
  loggedInPerson: any;

  changeForm!: FormGroup;
  validationMessages:
    | {
        Name: { type: string; message: string }[];
        Age: { type: string; message: string }[];
      }
    | undefined;

  musicGenre: string[] = chipsData.music;
  movieGenre: string[] = chipsData.movie;
  activity: string[] = chipsData.activity;

  chosenMusic: boolean[] = []; // dude this is so wrong
  chosenMovie: boolean[] = [];
  chosenActivity: boolean[] = [];

  constructor(
    public profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {}

  checkList(tempList: string[], tagToMatch: string[]): boolean[] {
    let matchList: boolean[] = [];
    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i] == tagToMatch[i]) {
        matchList.push(true);
      } else {
        matchList.push(false);
      }
    }
    return matchList;
  }

  ngOnInit(): void {
    this.loggedInPerson = this.profileService.getMyProfile(); // super laggy
    //alert(JSON.stringify(this.loggedInPerson));
    this.changeForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(2)]],
      Age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      // Sound: ['', [Validators.required, Validators.minLength(1)]]
    });

    //alert(JSON.stringify( this.loggedInPerson.Chips));

    let myChips = this.loggedInPerson.Chips;

    // this.chosenMusic = this.checkList(this.musicGenre, myChips);
    // this.chosenMovie = this.checkList(this.movieGenre, myChips);
    // this.chosenActivity = this.checkList(this.activity, myChips);
    // alert(JSON.stringify(this.chosenMovie));
    // alert(JSON.stringify(this.chosenMusic));
    // alert(JSON.stringify(this.chosenActivity));


    // for (let j = 0; j < myChips.length; j++) {
    //   for (let i = 0; i < this.musicGenre.length; i++) {
    //     if (myChips[j] == this.musicGenre[i]) {
    //       this.chosenMusic.push(true);
    //       alert("succes");
    //     } else {
    //       this.chosenMusic.push(false);
    //     }
    //   }
    // }

    for (let i = 0; i < this.musicGenre.length; i++) {
      
      for (let j = 0; j < myChips.length; j++) {
        //alert(' myChip' + myChips[j] + ' moviechip' + this.movieGenre[i]);
        if (myChips[j] == this.musicGenre[i]) {
          alert("succes" + myChips[j]);
          this.chosenMusic.push(true);
        } else {
          this.chosenMusic.push(false);
        }
      }
    }

    alert(JSON.stringify(this.chosenMusic));

    for (let i = 0; i < this.movieGenre.length; i++) {
      if (myChips[i] == this.movieGenre[i]) {
        this.chosenMovie.push(true);
      } else {
        this.chosenMovie.push(false);
      }
    }

    for (let i = 0; i < this.activity.length; i++) {
      if (myChips[i] == this.movieGenre[i]) {
        this.chosenActivity.push(true);
      } else {
        this.chosenActivity.push(false);
      }
    }

    // alert(JSON.stringify(this.chosenMusic));
    // alert(JSON.stringify(this.chosenMovie));
    // alert(JSON.stringify(this.chosenActivity));

    this.validationMessages = {
      Name: [
        {
          type: 'required',
          message: 'Name is required.',
        },
        {
          type: 'minlength',
          message: 'Name requires minimum 2 characters.',
        },
      ],
      Age: [
        {
          type: 'required',
          message: 'Age is required.',
        },
        {
          type: 'min',
          message: 'Age most be greater than 0.',
        },
        {
          type: 'max',
          message: 'Age most be less than 100.',
        },
      ],
    };
  }

  chosenChip(name: string) {
    alert(name);
  }

  saveChanges() {
    // push changes to firebase
    this.profileService.updateProfile(this.changeForm.value); /// NOT IMPLEMENTED
    alert(JSON.stringify(this.changeForm.value));
  }
}
