import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Contact } from 'src/app/interfaces/contact'
import { Message } from 'src/app/interfaces/message'
import contactData from 'src/app/jsonData/contact.json' 
import messageData from 'src/app/jsonData/message.json' 
import { ActivatedRoute } from '@angular/router';

import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatPage implements OnInit {

  loggedInPerson: any;
  otherContact: any = null;
  messages: Message[] = messageData;

  messageToSend = "";

  constructor(public profileService: ProfileService, private route: ActivatedRoute) { 
    const id = this.route.snapshot.paramMap.get('ContactId');
    let actualId = id !== null ? JSON.parse(id) : null;

    this.otherContact = this.profileService.getContactById(actualId);
    this.loggedInPerson = this.profileService.getMyProfile();

    this.messages = this.profileService.getMessagesBetweenContacts(actualId);

  }

  ngOnInit() {
  }

  sendMessage(){
    if(this.messageToSend == "") return;
    let newMessage =  {
      "SenderContactId": this.profileService.loggedInId,
      "ReceiverContactId": this.otherContact.ContactId,
      "Message": this.messageToSend,
      "DateTime": new Date().toDateString()
    }

    this.messages.push(newMessage);
    this.messageToSend = "";
  }

}
