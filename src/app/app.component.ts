import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {Word} from "./word";
import {FormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgIf} from "@angular/common";

const wordsList: Word[] = [
  new Word("conducted by", "prowadzone przez"),
  new Word("distortion", "zniekształcenie"),
  new Word("neglect", "zaniedbanie"),
  new Word("emphasis", "podkreślenie"),
  new Word("persuasive", "przekonywający"),
  new Word("discrepancy", "rozbieżność"),
  new Word("abbreviation", "skrót"),
  new Word("consistent", "konsekwentny"),
  new Word("resilient", "odporny"),
  new Word("verbose", "gadatliwy"),
  new Word("persistent", "wytrwały"),
  new Word("imposter", "oszust"),
  new Word("clerk", "urzędnik"),
  new Word("rugged", "chropowaty"),
  new Word("rogue", "łobuz"),
  new Word("gathered", "zbierać"),
  new Word("prioritize", "ustalać priorytety"),
  new Word("combating", "ustalać zwalczanie"),
  new Word("wanderlust", "zamiłowanie do włóczęgi"),
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    FormsModule,
    MatSlideToggle,
    MatCardHeader,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  wordsList: Word[] = [];
  answers: string[] = [];
  currentWord!: Word;
  isChecked = false;
  disableButton1 = false;
  disableButton2 = false;
  disableButton3 = false;

  ngOnInit() {
    this.wordsList = wordsList;
    this.shuffle();
  }

  getRandomIndex(length: number): number {
    return Math.floor(Math.random() * length);
  }

  shuffle() {
    this.currentWord = this.wordsList[this.getRandomIndex(this.wordsList.length)];
    this.answers = [
      this.currentWord.polish,
      this.wordsList[this.getRandomIndex(this.wordsList.length)].polish,
      this.wordsList[this.getRandomIndex(this.wordsList.length)].polish
    ];
    this.answers = this.shuffleArray(this.answers);
    this.disableButton1 = false;
    this.disableButton2 = false;
    this.disableButton3 = false;
  }

  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkAnswer() {
    if (this.currentWord.polish === this.answers[0]) {
      this.disableButton2 = true;
      this.disableButton3 = true;
    }
    if (this.currentWord.polish === this.answers[1]) {
      this.disableButton1 = true;
      this.disableButton3 = true;
    }
    if (this.currentWord.polish === this.answers[2]) {
      this.disableButton1 = true;
      this.disableButton2 = true;
    }
  }

  readText() {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(this.currentWord.english);
      speech.lang = 'en-US';

      const setVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => voice.lang.startsWith('en') && voice.name.includes('English'));
        if (englishVoice) {
          speech.voice = englishVoice;
        }
        window.speechSynthesis.speak(speech);
      };

      if (window.speechSynthesis.getVoices().length > 0) {
        setVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = setVoice;
      }
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  }

}
