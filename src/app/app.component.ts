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
  new Word("combating", "zwalczanie"),
  new Word("wanderlust", "zamiłowanie do włóczęgi"),
  new Word("despite", "pomimo"),
  new Word("hourly rate", "stawka godzinowa"),
  new Word("for quite some time", "przez jakiś czas"),
  new Word("smacked myself", "uderzyłem się"),
  new Word("get access", "uzyskąc dostęp"),
  new Word("police spokesman", "rzecznik policji"),
  new Word("holidaymakers", "wczasowicze"),
  new Word("apparent", "pozorny"),
  new Word("postponed in time", "odroczony w czasie"),
  new Word("advocated", "popierał"),
  new Word("cherished", "ceniony"),
  new Word("grieve", "smucić"),
  new Word("contrary", "przeciwnie"),
  new Word("newcomers", "przybysze"),
  new Word("water scarcity", "niedobór wody"),
  new Word("entire world", "cały świat"),
  new Word("price surge", "wzrost cen"),
  new Word("transaction fees", "opłaty transakcyjne"),
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
  startCount: number = 3;
  count!: number;
  settings = false;
  countDown = false;
  autoNext = false;
  autoRead = false;
  isLoading = false;
  disableButton1 = false;
  disableButton2 = false;
  disableButton3 = false;

  ngOnInit() {
    this.wordsList = wordsList;
    this.settingInit();
    this.shuffle();
  }

  private settingInit() {
    const storedCountDown = localStorage.getItem('countDown');
    if (storedCountDown !== null) {
      this.countDown = storedCountDown === 'true';
    }
    const storedAutoNext = localStorage.getItem('autoNext');
    if (storedAutoNext !== null) {
      this.autoNext = storedAutoNext === 'true';
    }
    const storedAutoRead = localStorage.getItem('autoRead');
    if (storedAutoRead !== null) {
      this.autoRead = storedAutoRead === 'true';
    }
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
    if(this.autoRead){
      this.readText();
    }
    if (this.countDown) {
      this.countdownAfterShuffle();
    }
    this.disableButton1 = false;
    this.disableButton2 = false;
    this.disableButton3 = false;
  }

  settingChanged() {
    localStorage.setItem('countDown', String(this.countDown));
    localStorage.setItem('autoNext', String(this.autoNext));
    localStorage.setItem('autoRead', String(this.autoRead));
  }

  countdownAfterShuffle() {
    this.count = this.startCount;
    this.isLoading = true;
    const interval = setInterval(() => {
      if (this.count > 0) {
        this.count--;
      } else {
        clearInterval(interval);
        this.isLoading = false;
      }
    }, 800);
  }

  countdownAfterAnswer() {
    this.count = this.startCount;
    const interval = setInterval(() => {
      if (this.count > 0) {
        this.count--;
      } else {
        clearInterval(interval);
        this.shuffle();
      }
    }, 500);
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
    if (this.autoNext) {
      this.countdownAfterAnswer();
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
