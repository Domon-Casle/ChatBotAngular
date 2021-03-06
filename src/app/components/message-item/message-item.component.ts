import { Component, OnInit, Input } from '@angular/core';
import { Message } from "src/app/models/message";

@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input('message')
  private message: Message;

  constructor() { }

  ngOnInit() {
  }

  getUserClass() {
    if (this.message.user === 'Bot') {
      return {
        'botUser': true
      };
    } else {
      return {
        'userUser': true
      };
    }
  }
}
