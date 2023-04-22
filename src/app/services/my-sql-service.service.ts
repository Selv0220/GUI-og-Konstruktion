import { Injectable, inject } from '@angular/core';
//import { Contact } from 'src/app/interfaces/contact'; // interface
import { Message } from 'src/app/interfaces/message';

import { Contact } from '../models/contact'; // class        // neither the interface nor the class makes it work

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MySqlServiceService {
  base_path = 'http://server.moedekjaer.dk:8080/api/';
  contacts: any[] = [];
  //contacts: Contact[] = [];
  loggedInId: number = 1;
  lastContact: number[] = [-1, -1, -1];
  
  constructor(public http: HttpClient) {
    // Http Options
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    
    this.getAllContacts();
  }

  getAllContacts(){
    this.getContacts().subscribe(response => {
      console.log(response); // we get the response fine
      this.contacts = response; // they are the same type yet I can't assign contacts to the response, it's empty 
    })

    console.log("contacts: " + this.contacts + " length: " + this.contacts.length);
  }
  
  getContacts(): Observable<Contact[]> {
    return this.http
    .get<Contact[]>(this.base_path + 'contacts')
    .pipe(retry(2), catchError(this.handleError));
  }
  
  getMyContacts() {
    let MyContacts: any[] = [];
    
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].ContactId != this.loggedInId) {
        MyContacts.push(this.contacts[i]);
      }
    }
    
    return MyContacts;
  }
  
  getMyProfile(): any {
    for (let i = 0; i < this.contacts.length; i++) {
      alert(this.contacts[i].ContactId);
      if (this.contacts[i].ContactId == this.loggedInId) {
        return this.contacts[i];
      }
    }
  }
  
  getRandomProfile(): any {
    //Uses checkViewd from the profile.service, hmm a service that uses another service
    // let randomId = Math.floor(Math.random() * this.contacts.length);
    // for (let i = 0; i < this.contacts.length; i++) {
      //   if (i == randomId && this.contacts[i].ContactId != this.loggedInId && !this.checkViewed(this.contacts[i].ContactId) && !this.lastContact.includes(this.contacts[i].ContactId)) {
        //     if (this.contacts[i].ContactId != 0) {
          //       this.lastContact.push(this.contacts[i].ContactId);
          //       this.lastContact.shift();
          //     }
          //     return this.contacts[i];
          //   }
          // }
          // return this.getRandomProfile();
        }
        
        updateProfile(profile: Contact) {
          console.log(profile);
          
          
        }
        
        // getContacts(): any[] {
          //   let MyContacts: any[] = [];
          
          //   for (let i = 0; i < this.contacts.length; i++) {
            //     if (this.contacts[i].ContactId != this.loggedInId) {
              //       MyContacts.push(this.contacts[i]);
              //     }
  //   }
  
  //   return MyContacts;
  // }
  
  getContactById(id: number): any {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].ContactId == id) return this.contacts[i];
    }
    return null;
  }
  
  sortMyMessages(sendtMessages: Message[]): Message[] {
    sendtMessages.sort((a, b) => {
      return <any>new Date(b.DateTime) - <any>new Date(a.DateTime);
    });
    return sendtMessages;
  }
  
  removeDuplicates(myArray: any[], Prop: any) {
    return myArray.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[Prop]).indexOf(obj[Prop]) === pos;
    });
  }


  
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
