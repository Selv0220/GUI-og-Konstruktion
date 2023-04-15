import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatchProfileComponent } from '../match-profile/match-profile.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, MatchProfileComponent]
})
export class Tab2Page {

  constructor() {}

}
