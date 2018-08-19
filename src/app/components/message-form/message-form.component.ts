import { Component, OnInit, Input } from '@angular/core';
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

  @Input('message')
  private message: Message;

  @Input('messages')
  private messages: Message[];

  private botResponseConverter: BotResponseMessage = null;

  constructor(private luisAIService: LuisaiService) { 
    this.botResponseConverter = new BotResponseMessage();
  }

  ngOnInit() {
    this.message = new Message('', false);

    var startingMessage = new Message('Hi this is a easy answer bot', true);
    this.messages = [];
    this.messages.push(startingMessage);
  }

  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);

    var test = this.luisAIService.getResponse(this.message.content).pipe(
      map((res: Response) => res.text())
    )
    .subscribe(
      luisResult => {
        var luisResultJSON = JSON.parse(luisResult.toString());
        console.log(luisResultJSON);
        var result = this.getBotResponseMessage(luisResultJSON);
        var botMessage = new Message(result, true);
        this.messages.push(botMessage);
      },
      err => console.log(err),
      () => console.log("No errors to report!")
    );;

    this.message = new Message('', false);
  }

  private getBotResponseMessage(luisResult) {
    if (luisResult.topScoringIntent && luisResult.entities) {
      return this.botResponseConverter.getBotResponse(luisResult);
    } else {
      return "I'm sorry I'm not sure how to reply... check your spelling and try again. Thanks!";
    }
  };
}
