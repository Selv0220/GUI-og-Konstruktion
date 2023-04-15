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

  otherContact: any = null;
  messages: Message[] = messageData;

  constructor(public profileService: ProfileService, private route: ActivatedRoute) { 
    const id = this.route.snapshot.paramMap.get('ContactId');
    let actualId = id !== null ? JSON.parse(id) : null;
    console.log(actualId);
    this.otherContact = this.profileService.getContactById(actualId);
    this.messages = this.profileService.getMessagesBetweenContacts(actualId);

  }

  ngOnInit() {
  }

}
