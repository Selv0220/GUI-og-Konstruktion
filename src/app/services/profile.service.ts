import { Injectable } from '@angular/core';
import contactData from 'src/app/jsonData/contact.json'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  loggedInId: number = 1;

  constructor() { }

  getMyProfile(): any {
    for (let i = 0; i < contactData.length; i++) {
      if (contactData[i].ContactId == this.loggedInId) {
        return contactData[i];
      }
    }
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
}
