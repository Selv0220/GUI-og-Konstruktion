import { Injectable, inject } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { Message } from 'src/app/interfaces/message';
import contact from 'src/app/jsonData/contact.json';
import messageData from 'src/app/jsonData/message.json';
import { Firestore, addDoc, collection, collectionData, updateDoc, deleteDoc, getDocs, query, getDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  contacts: any[] = contact;
  //observableContacts: Observable<any[]>;
  messages: Message[] = messageData;
  observableMessages: Observable<any[]>;
  matches: any[] = [];
  observableMatches: Observable<any[]>;
  loggedInId: number = 0;
  firestore: Firestore = inject(Firestore);
  lastContact: number[] = [-1,-1,-1];

  constructor(private contactService: ContactService, private router: Router) {
    if (this.loggedInId == 0 && this.router.url != '') {
      this.router.navigate(['']);
    }
    this.observableMatches = collectionData(collection(this.firestore, 'matches'));
    this.observableMatches.subscribe(data => {
      this.matches = data;
    });
    this.updateAll();
    this.observableMessages = collectionData(collection(this.firestore, 'messages'));
    this.observableMessages.subscribe(data => {
      this.messages = data;
    });
  }

  updateAll(): void {
    this.contactService.getAll()
      .subscribe(
        data => {
          this.contacts = data;
        },
        error => {
          console.log(error);
        });
  }

  sendMessage(contactId: number, message: string): void {
    var date = new Date();
    var dateStr =
      date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
      ("00" + date.getDate()).slice(-2) + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" + 
      ("00" + date.getSeconds()).slice(-2);
    addDoc(collection(this.firestore, 'messages'), { SenderContactId: this.loggedInId, ReceiverContactId: contactId, Message: message, DateTime: dateStr });
  }

  addMatch(ContactId: number, Match: boolean): void {
    console.log("Match added: " + ContactId + " " + Match);

    //addDoc(collection(this.firestore, 'matches'), { ContactId: this.loggedInId, MatchedContactId: ContactId, Match: Match, Datetime: new Date() });
    //deleteDoc(collection(this.firestore, 'matches'));
  }

  checkViewed(contactId: number): boolean {
    try {
      for (let i = 0; i < this.matches.length; i++) {
        if (this.matches[i].ContactId == this.loggedInId && this.matches[i].MatchedContactId == contactId) {
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }

    return false;
  }

  
  getMyProfile(): any {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].ContactId == this.loggedInId) {
        return this.contacts[i];
      }
    }
  }

  getRandomProfile(): any {
    let randomId = Math.floor(Math.random() * this.contacts.length);
    for (let i = 0; i < this.contacts.length; i++) {
      if (i == randomId && this.contacts[i].ContactId != this.loggedInId && !this.checkViewed(this.contacts[i].ContactId) && !this.lastContact.includes(this.contacts[i].ContactId)) {
        if (this.contacts[i].ContactId != 0) {
          this.lastContact.push(this.contacts[i].ContactId);
          this.lastContact.shift();
        }
        let temp: any = this.contacts[i];
        try {
          temp.Chips = temp.Chips.split(",");
        } catch (error) {
          //console.log(error);
        }
        return temp;
      }
    }
    return this.getRandomProfile();
  }

  updateProfile(profile: Contact){
    console.log(profile);
          
    // should update the matching profile by it's document id or add if no match is found 
    // when I update the profile on the page I don't see the new value on the profile, but bastion saw it in his database
    //await setDoc(doc(this.firestore, "contacts"), profile);
    
  }

  getContacts(): any[] {
    let MyContacts: any[] = [];

    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].ContactId != this.loggedInId) {
        MyContacts.push(this.contacts[i]);
      }
    }

    return MyContacts;
  }

  getContactById(id: number): any {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].ContactId == id) return this.contacts[i];
    }
    return null;
  }

  getContactByTelephone(telephone: string): any {
    if(telephone.length  != 8) return null;
    return this.contactService.findByTelephone(telephone);
  }

  loginContact(id: number){
    this.loggedInId = id;
    console.log(this.loggedInId);
    this.updateAll();
  }

  getMessagesBetweenContacts(otherContactId: number): Message[] {
    let myMessages: Message[] = [];
    let allMessages: Message[] = this.messages;

    for (let i = 0; i < allMessages.length; i++) {
      if (allMessages[i].SenderContactId == otherContactId && allMessages[i].ReceiverContactId == this.loggedInId || allMessages[i].ReceiverContactId == otherContactId && allMessages[i].SenderContactId == this.loggedInId) {
        myMessages.push(allMessages[i]);
      }
    }

    return (this.sortMyMessages(myMessages)).reverse();
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
