import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Message } from 'src/app/models/message';
import { LuisaiService } from '../../services/luisai.service';
import { map } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { BotResponseMessage } from 'src/app/Shared/botResponseMessage';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {
  private message: Message;

  @Input('messages')
  private messages: Message[];

  private botResponseConverter: BotResponseMessage = null;

  private hasSaidHello = false;
  private hasSaidHi = false;
  private hasSaidHowdy = false;
  private hasSaidBigHi = false;

  constructor(private luisAIService: LuisaiService) { 
    this.botResponseConverter = new BotResponseMessage();
  }

  ngOnInit() {
    this.message = new Message('', false);

    var startingMessage = new Message('Hi this is an easy answer bot', true);
    this.messages = [];
    this.addToMessage(startingMessage);
  }

  public handleEnter(event): void {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  };

  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.addToMessage(this.message);

    switch (this.message.content) {
      case "Hi":
      case "HI":
      case "hi":
        var hiMessage = new Message('Hi!', true);
        this.addToMessage(hiMessage);
        this.hasSaidHi = true;
        break;

      case "Howdy":
      case "howdy":
        var hiMessage = new Message('Howdy!!', true);
        this.addToMessage(hiMessage);
        this.hasSaidHowdy = true;
        break;

      case "Hello":
      case "hello":
        var hiMessage = new Message('Hello!!!', true);
        this.addToMessage(hiMessage);
        this.hasSaidHello = true;
        break;
      
      case "goodbye":
        var goodByeMessage = new Message('Good bye!!!! Have a great day!', true);
        this.addToMessage(goodByeMessage);
        break;

      default:
        this.luisAIService.getResponse(this.message.content).pipe(
          map((res: Response) => res.text())
        )
        .subscribe(
          luisResult => {
            var luisResultJSON = JSON.parse(luisResult.toString());
            var result = this.getBotResponseMessage(luisResultJSON);
            var botMessage = new Message(result, true);
            this.addToMessage(botMessage);
          },
          err => console.log(err),
          () => console.log("No errors to report!")
        );
        break;
    }

    if (this.hasSaidHello && this.hasSaidHi && this.hasSaidHowdy && !this.hasSaidBigHi) {
      var bigHiMessage = new Message('Ok ok i get it HI! Howdy! and Hello! Have a great one!', true);
      this.addToMessage(bigHiMessage);
      this.hasSaidBigHi = true;
    }

    this.message = new Message('', false);
  }

  private getBotResponseMessage(luisResult) {
    if (luisResult.topScoringIntent && luisResult.entities) {
      return this.botResponseConverter.getBotResponse(luisResult);
    } else {
      return "I'm sorry I'm not sure how to reply... check your spelling and try again. Thanks!";
    }
  };

  private addToMessage(message) {
    if (this.messages.length > 7) {
      this.messages.splice(0, 1);
    }

    this.messages.push(message);
  }
}
