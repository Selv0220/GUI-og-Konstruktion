import { CommonModule } from '@angular/common';
import { Component, Input, AfterViewInit, ViewChildren, ElementRef, QueryList, NgZone } from '@angular/core';
import { GestureController, IonCard, IonicModule } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-match-profile',
  templateUrl: './match-profile.component.html',
  styleUrls: ['./match-profile.component.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule],
})
export class MatchProfileComponent implements AfterViewInit {
  contacts: any[] = [];

  @ViewChildren(IonCard, { read: ElementRef }) cards!: QueryList<ElementRef>;

  constructor(private gestureCtrl: GestureController, private profile: ProfileService, private ngZone: NgZone) {
    this.loadRealData();
  }

  loadRealData() {
    setTimeout(() => {
      if (this.profile.getRandomProfile().Name != "Error") {
        this.addCard();
      }
      else {
        this.loadRealData();
      }
    },25);
    
  }

  ngAfterViewInit(): void {
    this.loadRealData();
  }

  useSwipe(cardArray: any) {
    for(let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i];
      
      const gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'swipe',
        onStart: ev => {
          
        },
        onMove: ev => {
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
        },
        onEnd: ev => {
          card.nativeElement.style.transition = 'transform 0.5s ease-in-out';

          if(ev.deltaX > 150) {
            card.nativeElement.style.transform = 'translateX(200vw) rotate(40deg)';
            setTimeout(() => card.nativeElement.remove(),500);
            this.addCard();
          } else if(ev.deltaX < -150) {
            card.nativeElement.style.transform = 'translateX(-200vw) rotate(-40deg)';
            setTimeout(() => card.nativeElement.remove(),500);
            this.addCard();
          } else {
            card.nativeElement.style.transform = '';
          }
        }
      });

      gesture.enable(true);
    }
  }

  addCard() {
    this.ngZone.run(() => {
      this.contacts.push(this.profile.getRandomProfile());
      const cardArray = this.cards.toArray();
      this.useSwipe([cardArray[cardArray.length - 1]]);
    });
  }
}
