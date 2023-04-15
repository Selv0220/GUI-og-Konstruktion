import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Contact } from 'src/app/interfaces/contact'
import { Message } from 'src/app/interfaces/message'
import { CommonModule } from '@angular/common';

import contactData from 'src/app/jsonData/contact.json' 
import messageData from 'src/app/jsonData/message.json' 
import { escape } from 'querystring';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Tab3Page {

  loggedInId: number = 1;

  contacts: any[] = contactData;
  messages: Message[] = messageData;

  constructor() {}

  myMessages(): void {
    this.messages.sort((a, b) => {
      return <any>new Date(b.DateTime) - <any>new Date(a.DateTime);
    });
  }

  // Function that returns the all contacts sorted by the latest message
  getMyContacts(): Contact[] {
    this.myMessages();

    let MyContacts: Contact[] = [];
    let MyMessages: Message[] = [];

    for (let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].ReceiverContactId == this.loggedInId) {
        MyMessages.push(this.messages[i]);
      }
    }

    console.log(MyMessages);
    
    MyMessages = this.removeDuplicates(MyMessages, 'SenderContactId');

    for (let i = 0; i < MyMessages.length; i++) {
      for (let j = 0; j < this.contacts.length; j++) {
        if (this.contacts[j].ContactId == MyMessages[i].SenderContactId) {
          this.contacts[j].LatestMessage = MyMessages[i].Message;
          this.contacts[j].DateTime = MyMessages[i].DateTime;
          MyContacts.push(this.contacts[j]);
          break;
        }
      }
    }

    return MyContacts;
  }

  removeDuplicates(myArray: any[], Prop: any) {
    return myArray.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[Prop]).indexOf(obj[Prop]) === pos;
    });
  }
  

  /*getMyMessages(){ // really should be outsorced to a service

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
  }*/


  // use json for storing profiles and messages

  // profiles should contain name and png and be displayed along side their latest message

  // a messages contains the message and the receiver and sender and datetime of the message

}
