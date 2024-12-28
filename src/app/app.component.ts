import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
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
  new Word("delightful", "zachwycający"),
  new Word("the place is packed", "miejsce jest zatłoczone"),
  new Word("year prior", "rok wcześniej"),
  new Word("incentives", "zachęty"),
  new Word("subsidies", "dotacje"),
  new Word("ruthless", "bezwzględny"),
  new Word("frugal", "osczędny"),
  new Word("stubborn", "uparty"),
  new Word("counterfeit", "podróbka"),
  new Word("notice", "wypowiedzenie"),
  new Word("anytime soon", "w najbliższym czasie"),
  new Word("miserable", "nieszczęśliwy"),
  new Word("volatility", "zmienność"),
  new Word("struggling", "zmagać się"),
  new Word("regardless", "mimo wszystko"),
  new Word("however", "Jednakże"),
  new Word("according to", "według")
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
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  initWordsList: Word[] = [];
  wordsList: Word[] = [];
  answers: string[] = [];
  correctAnswerCounter: number = 0;
  inCorrectAnswerCounter: number = 0;
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
  englishToPolish = false;

  ngOnInit() {
    this.initWordsList = wordsList;
    this.wordsList = [...this.initWordsList];
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

  createAnswers() {
    if (this.englishToPolish) {
      do {
        this.answers = [
          this.currentWord.polish,
          this.initWordsList[this.getRandomIndex(this.initWordsList.length)].polish,
          this.initWordsList[this.getRandomIndex(this.initWordsList.length)].polish
        ];
      } while (this.answers[1] === this.answers[2] || this.currentWord.polish === this.answers[1] || this.currentWord.polish === this.answers[2]);
    } else {
      do {
        this.answers = [
          this.currentWord.english,
          this.initWordsList[this.getRandomIndex(this.initWordsList.length)].english,
          this.initWordsList[this.getRandomIndex(this.initWordsList.length)].english
        ];
      } while (this.answers[1] === this.answers[2] || this.currentWord.english === this.answers[1] || this.currentWord.english === this.answers[2]);
    }
  }

  shuffle() {
    this.checkIfListIsEnd();
    this.setLanguage();

    const index = this.getRandomIndex(this.wordsList.length);
    this.currentWord = this.wordsList.splice(index, 1)[0];

    this.createAnswers();

    this.answers = this.shuffleArray(this.answers);

    if (this.autoRead && this.englishToPolish) {
      this.readText();
    }

    if (this.countDown) {
      this.countdownAfterShuffle();
    }

    this.disableButton1 = false;
    this.disableButton2 = false;
    this.disableButton3 = false;
  }

  private checkIfListIsEnd() {
    if (this.wordsList.length === 1) {
      this.wordsList = [...this.initWordsList];
    }
  }

  setLanguage() {
    this.englishToPolish = this.getRandomIndex(100) % 2 === 0;
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

  checkAnswer(answer: string) {
    const isCorrect = (word: string, answer: string) => word === answer;

    const updateButtonState = (correctIndex: number) => {
      this.disableButton1 = correctIndex !== 0;
      this.disableButton2 = correctIndex !== 1;
      this.disableButton3 = correctIndex !== 2;
    };
    if (this.autoRead) {
      this.readText();
    }

    const currentWord = this.englishToPolish ? this.currentWord.polish : this.currentWord.english;

    for (let i = 0; i < this.answers.length; i++) {
      if (isCorrect(currentWord, this.answers[i])) {
        updateButtonState(i);
        break;
      }
    }

    this.countAnswer(answer);

    if (this.autoNext) {
      this.countdownAfterAnswer();
    }
  }

  countAnswer(answer: string) {
    const currentWord = this.englishToPolish ? this.currentWord.polish : this.currentWord.english;

    if (currentWord === answer) {
      this.correctAnswerCounter++;
    } else {
      this.inCorrectAnswerCounter++;
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
