import { Injectable } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact'
import { Message } from 'src/app/interfaces/message'
import contactData from 'src/app/jsonData/contact.json' 
import messageData from 'src/app/jsonData/message.json' 

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  contacts: any[] = contactData;
  messages: Message[] = messageData;
  loggedInId: number = 1;

  constructor() { }

  getMyProfile(): any {
    for (let i = 0; i < contactData.length; i++) {
      if (contactData[i].ContactId == this.loggedInId) {
        return contactData[i];
      }
    }
  }
  
  getRandomProfile(): any {
    let randomId = Math.floor(Math.random() * contactData.length) + 1;
    for (let i = 0; i < contactData.length; i++) {
      if (contactData[i].ContactId == randomId && contactData[i].ContactId != this.loggedInId) {
        return contactData[i];
      }
    }
    return this.getRandomProfile();
  }

  getContacts(): any[] {
    let MyContacts: any[] = [];

    for (let i = 0; i < contactData.length; i++) {
      if (contactData[i].ContactId != this.loggedInId) {
        MyContacts.push(contactData[i]);
      }
    }

    return MyContacts;
  }

  getContactById(id: number): any{
    for (let i = 0; i < contactData.length; i++){
      if(contactData[i].ContactId == id) return contactData[i];
    }
    return null;
  }

  getMessagesBetweenContacts(ohterContactId: number): Message[] {
    let myMessages: Message[] = [];
    let allMessages: Message[] = this.messages;
    
    for (let i = 0; i < allMessages.length; i++){
      if(allMessages[i].SenderContactId == ohterContactId || allMessages[i].ReceiverContactId == ohterContactId){
        myMessages.push(allMessages[i]);
      }
    }

    return this.sortMyMessages(myMessages);
  }

  sortMyMessages(sendtMessages: Message[]): Message[] {
    sendtMessages.sort((a, b) => {
      return <any>new Date(b.DateTime) - <any>new Date(a.DateTime);
    });
    return sendtMessages;
  }

  myMessages() {
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

    //console.log(MyMessages);
    
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

}
