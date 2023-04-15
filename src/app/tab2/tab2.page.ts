import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatchProfileComponent } from '../match-profile/match-profile.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, MatchProfileComponent, CommonModule]
})
export class Tab2Page {

  firestore: Firestore = inject(Firestore);

  matches: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'matches')
    this.matches = collectionData(aCollection);
  }

}
