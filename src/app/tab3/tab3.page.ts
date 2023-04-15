import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Contact } from 'src/app/interfaces/contact'
import { Message } from 'src/app/interfaces/message'
import { CommonModule } from '@angular/common';

import contactData from 'src/app/jsonData/contact.json' 
import messageData from 'src/app/jsonData/message.json' 

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Tab3Page {

  loggedInId: number = 1;

  contacts: Contact[] = contactData;
  messages: Message[] = messageData;

  constructor() {
    this.getMyMessages();
  }

  getMyMessages(){ // really should be outsorced to a service

    let MyMessages: Message[] =[];

    for(let i = 0; i < this.messages.length;){
      if(this.messages[i].ReceiverContactId == this.loggedInId || this.messages[i].SenderContactId == this.loggedInId ){
        MyMessages.push(this.messages[i]);
      }
    }
    // MyMessages.sort((a, b) => {
    //   return <any>new Date(b.DateTime) - <any>new Date(a.DateTime);
    // });
    //   console.log(MyMessages);
  }


  // use json for storing profiles and messages

  // profiles should contain name and png and be displayed along side their latest message

  // a messages contains the message and the receiver and sender and datetime of the message

}
