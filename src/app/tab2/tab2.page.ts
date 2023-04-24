import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatchProfileComponent } from '../match-profile/match-profile.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, MatchProfileComponent, RouterModule]
})
export class Tab2Page {

  constructor() {}

}
