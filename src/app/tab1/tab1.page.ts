import { Component} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class Tab1Page {

  loggedInPerson: any;

  constructor(public profileService: ProfileService) {
    this.loggedInPerson = this.profileService.getMyProfile(); // if you start on this page you won't get you profile data
  }

}