import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IonChip, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ChipService } from 'src/app/services/chip.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.page.html',
  styleUrls: ['./editing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule,
  ],
})

export class EditingPage implements OnInit, AfterViewInit {

  //loggedInPerson: any = {"Chips":["Rock","Pop","Action"],"ContactId":1,"PngPath":"https://images.unsplash.com/photo-1581382575275-97901c2635b7","Name":"Gary","Age":23}
  loggedInPerson: any; 
  contacts: any;

  loggedInName = "";
  loggedInAge = 0;

  changeForm!: FormGroup;
  validationMessages: { Name: { type: string; message: string; }[]; Age: { type: string; message: string; }[]; } | undefined;

  chipsData: any[] = [];

  @ViewChildren(IonChip, { read: ElementRef }) htmlChips!: QueryList<ElementRef>;

  constructor(public profileService: ProfileService, private formBuilder: FormBuilder, private chipService: ChipService) {
    chipService.getAll().subscribe((data: any) => {
      this.chipsData = data;
    });
  }

  ngOnInit() {
    this.loggedInPerson = this.profileService.getMyProfile();
    this.loggedInPerson.Chips = this.loggedInPerson.Chips.split(",");
    //this.loggedInPerson.Chips = (this.chipsData.find(x => x.ChipId == contactChips[index]));
    this.changeForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(2)]],
      Age: ['', [Validators.required, Validators.min(0), Validators.max(120)]]
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

  showChips(type: string): any[] {
    // return all chips of type
    return this.chipsData.filter((chip: any) => chip.Type === type);
  }


  ngAfterViewInit(): void {
    const chipsArray = this.htmlChips.toArray();
    for (let i = 0; i < chipsArray.length; i++) {
      if (!this.loggedInPerson?.Chips.includes(chipsArray[i].nativeElement.innerText)) {
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

    //this.mysqlService.updateProfile(saveObject); /// NOT IMPLEMENTED YET
  }
}