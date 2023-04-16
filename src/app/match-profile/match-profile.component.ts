import { CommonModule } from '@angular/common';
import { Component, Input, AfterViewInit, ViewChildren, ElementRef, QueryList, NgZone } from '@angular/core';
import { GestureController, IonCard, IonicModule } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
import chipsData from 'src/app/jsonData/chips.json';

@Component({
  selector: 'app-match-profile',
  templateUrl: './match-profile.component.html',
  styleUrls: ['./match-profile.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class MatchProfileComponent implements AfterViewInit {
  contacts: any[] = [];

  chipsData: any = chipsData;

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
    }, 200);

  }

  ngAfterViewInit(): void {
    this.loadRealData();
  }

  useSwipe(card: any) {
    const yes = document.getElementById('yes');
    const no = document.getElementById('no');
    const gesture = this.gestureCtrl.create({
      el: card.nativeElement,
      gestureName: 'swipe',
      onStart: ev => {
        if(yes != null && no != null) {
          yes.style.opacity = '0';
          no.style.opacity = '0';
        }
      },
      onMove: ev => {
        card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
        if(yes != null && no != null) {
          if (ev.deltaX > 0) {
            no.style.opacity = `${ev.deltaX / 500}`;
          } else {
            yes.style.opacity = `${ev.deltaX / -500}`;
          }
        }
        
      },
      onEnd: ev => {
        card.nativeElement.style.transition = 'transform 0.25s ease-in-out';

        if (ev.deltaX > 150) {
          this.profile.addMatch(card.nativeElement.id, false);
          card.nativeElement.style.transform = 'translateX(200vw) rotate(40deg)';
          setTimeout(() => {card.nativeElement.remove();}, 250);
          this.addCard();
        } else if (ev.deltaX < -150) {
          this.profile.addMatch(card.nativeElement.id, true);
          card.nativeElement.style.transform = 'translateX(-200vw) rotate(-40deg)';
          setTimeout(() => {card.nativeElement.remove();}, 250);
          this.addCard();
        } else {
          card.nativeElement.style.transform = '';
        }
      }
    });

    gesture.enable(true);
  }

  addCard() {
    this.ngZone.run(() => {
      const cardArray = this.cards.toArray();
      const card = cardArray[cardArray.length - 1];
      this.contacts.push(this.profile.getRandomProfile());
      if (cardArray.length > 0 ) {
        card.nativeElement.style.visibility = 'visible';
        card.nativeElement.style.opacity = '1';
        this.useSwipe(card);
      }
    });
  }

  getChips(contactChips: any[]) {
    let chips: any[] = [];
    let profile = this.profile.getMyProfile();
    for (let index = 0; index < contactChips.length; index++) {
      if (profile.Chips.includes(contactChips[index])) {
        let chip = {"name": contactChips[index], "type": ""};
        if (this.chipsData.music.includes(contactChips[index])) {
          chip.type = 'music';
          chips.push(chip);
        } else if (this.chipsData.movie.includes(contactChips[index])) {
          chip.type = 'movie';
          chips.push(chip);
        } else {
          chip.type = 'activity';
          chips.push(chip);
        }
      }
    }
    return chips;
  }
}
