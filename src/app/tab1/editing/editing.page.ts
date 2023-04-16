import { Component} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.page.html',
  styleUrls: ['./editing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditingPage{

  loggedInPerson: any;
  nameChangeText: string = "";
  ageChangeText: string = "";

  constructor(public profileService: ProfileService) {
    this.loggedInPerson = this.profileService.getMyProfile();
  }

}
