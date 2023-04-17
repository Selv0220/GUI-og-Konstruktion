import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IonChip, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import chipsData from '../../jsonData/chips.json';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.page.html',
  styleUrls: ['./editing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule,
  ],
})

export class EditingPage implements OnInit, AfterViewInit {

  // loggedInPerson: any = {"Chips":["Rock","Pop","Action"],"ContactId":1,"PngPath":"https://images.unsplash.com/photo-1581382575275-97901c2635b7","Name":"Gary","Age":23}
  loggedInPerson: any;

  changeForm!: FormGroup;
  validationMessages: { Name: { type: string; message: string; }[]; Age: { type: string; message: string; }[]; } | undefined;

  musicGenre: string[] = chipsData.music;
  movieGenre: string[] = chipsData.movie;
  activity: string[] = chipsData.activity;
  chosenMusic: string[] = [];
  chosenMovie: string[] = [];
  chosenActivity: string[] = [];

  @ViewChildren(IonChip, { read: ElementRef }) htmlChips!: QueryList<ElementRef>;

  constructor(public profileService: ProfileService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loggedInPerson = this.profileService.getMyProfile(); // super laggy
    //alert(JSON.stringify(this.loggedInPerson));
    this.changeForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(2)]],
      Age: ['', [Validators.required, Validators.min(0), Validators.max(120)]]
      // Sound: ['', [Validators.required, Validators.minLength(1)]]
    });

    // Foreach chips in loggedInPerson.Chips check if it is in musicGenre, movieGenre or activity

    //this.chosenMusic = this.checkList(this.musicGenre, this.loggedInPerson.Chips);
    //this.chosenMovie = this.checkList(this.movieGenre, this.loggedInPerson.Chips);
    //this.chosenActivity = this.checkList(this.activity, this.loggedInPerson.Chips);

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

  ngAfterViewInit(): void {
    const chipsArray = this.htmlChips.toArray();
    for (let i = 0; i < chipsArray.length; i++) {
      if (!this.loggedInPerson.Chips.includes(chipsArray[i].nativeElement.innerText)) {
        chipsArray[i].nativeElement.classList.add('chosen');
      }
    }
  }

  toggleChip(chipValue: string) {
    const chipsArray = this.htmlChips.toArray();
    for (let i = 0; i < chipsArray.length; i++) {
      if (chipsArray[i].nativeElement.innerText === chipValue) {
        chipsArray[i].nativeElement.classList.toggle('chosen');
      }
    }
  }

  saveChanges() {
    // push changes to firebase

    // Chips without chosen
    const chipsArray = this.htmlChips.toArray();
    const chips = [];
    for (let i = 0; i < chipsArray.length; i++) {
      if (!chipsArray[i].nativeElement.classList.contains('chosen')) {
        chips.push(chipsArray[i].nativeElement.innerText);
      }
    }
    let saveObject = this.changeForm.value;
    saveObject.Chips = chips;

    this.profileService.updateProfile(saveObject); /// NOT IMPLEMENTED YET
  }
}