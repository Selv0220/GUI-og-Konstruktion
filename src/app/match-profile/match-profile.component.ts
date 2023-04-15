import { CommonModule } from '@angular/common';
import { Component, Input, AfterViewInit, ViewChildren, ElementRef, QueryList, NgZone } from '@angular/core';
import { GestureController, IonCard, IonicModule, Platform } from '@ionic/angular';
import { log } from 'console';

@Component({
  selector: 'app-match-profile',
  templateUrl: './match-profile.component.html',
  styleUrls: ['./match-profile.component.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule],
})
export class MatchProfileComponent implements AfterViewInit {
  @Input() name?: string;
  people = [
    { name: 'Matilde', age: 22, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { name: 'Tobias', age: 19, img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6' },
    { name: 'Julia', age: 20, img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e' },
  ]

  @ViewChildren(IonCard, { read: ElementRef }) cards!: QueryList<ElementRef>;

  constructor(private gestureCtrl: GestureController) {}

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
          } else if(ev.deltaX < -150) {
            card.nativeElement.style.transform = 'translateX(-200vw) rotate(-40deg)';
          } else {
            card.nativeElement.style.transform = '';
          }
        }
      });

      gesture.enable(true);
    }
  }
}
