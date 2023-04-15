import { CommonModule } from '@angular/common';
import { Component, Input, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
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
  contacts: any[] = this.profile.getContacts();

  @ViewChildren(IonCard, { read: ElementRef }) cards!: QueryList<ElementRef>;

  constructor(private gestureCtrl: GestureController, private profile: ProfileService) {}

  ngAfterViewInit(): void {
    const cardArray = this.cards.toArray();
    this.useSwipe(cardArray);
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
          } else if(ev.deltaX < -150) {
            card.nativeElement.style.transform = 'translateX(-200vw) rotate(-40deg)';
            setTimeout(() => card.nativeElement.remove(),500);
          } else {
            card.nativeElement.style.transform = '';
          }
        }
      });

      gesture.enable(true);
    }
  }
}
