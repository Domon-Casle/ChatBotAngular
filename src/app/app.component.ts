import { Component } from '@angular/core';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  private messages: Message[];

}
