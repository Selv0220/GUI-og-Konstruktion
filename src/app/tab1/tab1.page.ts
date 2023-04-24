import { Component} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { RouterModule } from '@angular/router';
import { MySqlServiceService } from 'src/app/services/my-sql-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class Tab1Page {

  loggedInPerson: any;

  constructor(public mysqlService: MySqlServiceService) {
    this.getMyProfile();
  }


  getMyProfile(){
    this.mysqlService.getMyProfile().subscribe(response => {
      console.log(response); 
      this.loggedInPerson = response;
    })
  }
}