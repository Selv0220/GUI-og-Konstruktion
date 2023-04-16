import { Component} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Contact } from 'src/app/interfaces/contact'
import { CommonModule } from '@angular/common';

import { ProfileService } from '../services/profile.service';
import { escape } from 'querystring';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class Tab3Page {

  constructor(public profileService: ProfileService) {}

  getMyContacts(): Contact[] {
    return this.profileService.getMyContacts();
  }

}
