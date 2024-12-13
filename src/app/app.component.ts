import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'english-words';
}
