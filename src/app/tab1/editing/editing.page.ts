import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IonChip, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ChipService } from 'src/app/services/chip.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ContactService } from 'src/app/services/contact.service';

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
  loggedInAge = "";

  changeForm!: FormGroup;
  validationMessages: { Name: { type: string; message: string; }[]; Age: { type: string; message: string; }[]; } | undefined;

  chipsData: any[] = [];

  @ViewChildren(IonChip, { read: ElementRef }) htmlChips!: QueryList<ElementRef>;

  constructor(public profileService: ProfileService, private formBuilder: FormBuilder, private chipService: ChipService, private contactService: ContactService) {
    chipService.getAll().subscribe((data: any) => {
      this.chipsData = data;
    });
  }

  ngOnInit() {
    this.loggedInPerson = this.profileService.getMyProfile();
    this.loggedInName = this.loggedInPerson.Name;
    this.loggedInAge = this.loggedInPerson.Age;
    try {
      this.loggedInPerson.Chips = this.loggedInPerson.Chips.split(",");
    } catch (error) {
      //console.log(error);
    }
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
    this.toggleAllChips();
  }

  toggleAllChips() {
    setTimeout(() => {
      const chipsArray = this.htmlChips.toArray();
      if (chipsArray != null && chipsArray.length > 0) {
        for (let i = 0; i < chipsArray.length; i++) {
          if (this.loggedInPerson?.Chips.includes(chipsArray[i].nativeElement.getAttribute("data-index"))) {
            chipsArray[i].nativeElement.classList.remove('chosen');
          }
        }
      }
      else {
        this.toggleAllChips();
      }
    }, 200);
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
        chips.push(chipsArray[i].nativeElement.getAttribute("data-index"));
      }
    }
    let saveObject = this.changeForm.value;
    saveObject.Chips = chips.toString();

    this.contactService.update(this.loggedInPerson.ContactId, saveObject).subscribe((data: any) => {
      console.log(data);
      this.profileService.updateAll();
    });
  }
}