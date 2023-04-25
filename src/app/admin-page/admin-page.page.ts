import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonChip, IonModal, IonicModule } from '@ionic/angular';
import { ChipService } from '../services/chip.service';
import { ProfileService } from '../services/profile.service';
import { Chip } from '../models/chip';
import { RouterModule } from '@angular/router';

export enum actionState {
  Edit,              // pop-up to edit the chip
  Delete,            // pop-up to ask if to delete the chip
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class AdminPagePage implements OnInit {

  actionState = actionState.Edit;

  popUpDeleteIsOpen: boolean = false;
  modalEditIsOpen: boolean = false;

  selectedChip: Chip = new Chip();
  chipsData: any[] = [];
  changeForm1!: FormGroup;
  changeForm2!: FormGroup;
  @ViewChildren(IonChip, { read: ElementRef }) htmlChips!: QueryList<ElementRef>;

  constructor(public profileService: ProfileService, private formBuilder: FormBuilder, private chipService: ChipService) { 
    this.getAllChips();
  }

  getAllChips(){
    this.chipService.getAll().subscribe((data: any) => {
      this.chipsData = data;
    });
  }

  ngOnInit() {
      this.changeForm1 = this.formBuilder.group({
        Type: ['', [Validators.required, Validators.minLength(2)]],
        Name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
      });
      this.changeForm2 = this.formBuilder.group({
        Type: ['', [Validators.required, Validators.minLength(2)]],
        Name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
      });
    this.selectedChip
  }

  toggle(){
    this.actionState++;
    if(this.actionState > 1) this.actionState = 0;
  }

  acceptDelete(doDelete: boolean){
    this.popUpDeleteIsOpen = false;
    if(!doDelete) return;

    this.deleteChip();
  }

  showChips(type: string): any[] {
    // return all chips of type
    return this.chipsData.filter((chip: any) => chip.Type === type);
  }

  chooseChip(chipId: any) {  // if edit show edit if delete show delete
    this.selectedChip = chipId;

    if(this.actionState == 1){
      this.popUpDeleteIsOpen = true;
    }
    else 
      this.modalEditIsOpen = true;
  }
  
  createChip() { // you should probably just select the genre instead
    console.log(this.changeForm1.value);
    this.selectedChip.Name = this.changeForm1.value.Name;
    this.selectedChip.Type = this.changeForm1.value.Type;
    this.chipService.create(this.selectedChip).subscribe(
      (data: any) => {
        let i = data[0] // not using the return value, but hey it's here
        console.log(i); 
        this.cancel()
        this.getAllChips();
      },
      (error: any) => { console.log(error); });
    }

    updateChip() {
      this.modalEditIsOpen = false;

      this.selectedChip.Name = this.changeForm2.value.Name;
      this.selectedChip.Type = this.changeForm2.value.Type;

      this.chipService.update(this.selectedChip.ChipId, this.selectedChip).subscribe(
        (data: any) => {
          let i = data[0]
          console.log(i);
          this.getAllChips(); // gotta get it again, not live like firebase
          this.changeForm2.value.setValue = null;
          },
        (error: any) => { console.log(error); });
    }

  deleteChip() {
    this.chipService.delete(this.selectedChip.ChipId).subscribe(
      (data: any) => {
        let i = data[0]
        console.log(i);
        this.cancel();
        },
      (error: any) => { console.log(error); });
  }
  
  @ViewChild(IonModal) modal!: IonModal;
  
  cancel(){
    this.getAllChips();
    this.modal.dismiss(null, 'cancel');
    this.popUpDeleteIsOpen = false;
    this.modalEditIsOpen = false;
    this.changeForm1.value.setValue = null;
    this.changeForm2.value.setValue = null;
    this.selectedChip = new Chip();
  }
}

