import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {Word} from "./word";
import {FormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgClass, NgIf} from "@angular/common";

const wordsList: Word[] = [
  new Word("a notice", "wypowiedzenie"),
  new Word("abbreviation", "skrót"),
  new Word("according to", "według"),
  new Word("advocated", "popierał"),
  new Word("anytime soon", "w najbliższym czasie"),
  new Word("apparent", "pozorny"),
  new Word("arson", "podpalenie"),
  new Word("alleged", "rzekomy"),
  new Word("cherished", "ceniony"),
  new Word("citation", "cytat"),
  new Word("clerk", "urzędnik"),
  new Word("bum", "włóczęga"),
  new Word("combating", "zwalczanie"),
  new Word("conducted by", "prowadzone przez"),
  new Word("consistent", "konsekwentny"),
  new Word("contrary", "przeciwnie"),
  new Word("counterfeit", "podróbka"),
  new Word("counterpart", "odpowiednik"),
  new Word("characteristic traits", "cechy charakterystyczne"),
  new Word("delightful", "zachwycający"),
  new Word("disposable", "jednorazowe"),
  new Word("disposable income", "dochód rozporządzalny"),
  new Word("day following event", "dzień po wydarzeniu"),
  new Word("despite", "pomimo"),
  new Word("despicable", "nikczemny"),
  new Word("diminishing to", "malejący"),
  new Word("discrepancy", "rozbieżność"),
  new Word("distortion", "zniekształcenie"),
  new Word("a duke", "książę"),
  new Word("emphasis", "podkreślenie"),
  new Word("entire world", "cały świat"),
  new Word("eventually", "ostatecznie"),
  new Word("for quite some time", "przez jakiś czas"),
  new Word("frugal", "osczędny"),
  new Word("former cook", "były kucharz"),
  new Word("gathered", "zbierać"),
  new Word("get access", "uzyskąc dostęp"),
  new Word("grieve", "smucić"),
  new Word("holidaymakers", "wczasowicze"),
  new Word("hourly rate", "stawka godzinowa"),
  new Word("however", "jednakże"),
  new Word("high hope", "wielka nadzieja"),
  new Word("imposter", "oszust"),
  new Word("grieving", "opłakiwać"),
  new Word("irrelevant", "nieistotny"),
  new Word("incentives", "zachęty"),
  new Word("intentional", "umyślny"),
  new Word("intended", "przeznaczony"),
  new Word("it's been a while", "minęło trochę czasu"),
  new Word("it's not over", "to nie koniec"),
  new Word("miserable", "nieszczęśliwy"),
  new Word("like any other", "jak każdy inny"),
  new Word("manhunt", "obława"),
  new Word("neglect", "zaniedbanie"),
  new Word("newcomers", "przybysze"),
  new Word("obnoxious", "obrzydliwy"),
  new Word("pardon my french", "przeprszam za przekleństwa"),
  new Word("persistent", "wytrwały"),
  new Word("persuasive", "przekonywający"),
  new Word("police spokesman", "rzecznik policji"),
  new Word("postponed in time", "odroczony w czasie"),
  new Word("price surge", "wzrost cen"),
  new Word("prioritize", "ustalać priorytety"),
  new Word("pristine", "dziewiczy"),
  new Word("reckon", "myśleć"),
  new Word("regardless", "mimo wszystko"),
  new Word("relentless", "nieustępliwy"),
  new Word("resilient", "odporny"),
  new Word("rogue", "łobuz"),
  new Word("rugged", "chropowaty"),
  new Word("ruthless", "bezwzględny"),
  new Word("recap", "podsumowanie"),
  new Word("spare money", "pieniądze do wydania"),
  new Word("since inception", "od początku istnienia"),
  new Word("spouse", "współmałżonek"),
  new Word("sophisticated", "wyrafinowany"),
  new Word("so called", "tak zwany"),
  new Word("smacked myself", "uderzyłem się"),
  new Word("somebody has to", "ktoś musi"),
  new Word("stubborn", "uparty"),
  new Word("struggling", "zmagać się"),
  new Word("subsidies", "dotacje"),
  new Word("tangled", "zaplątany"),
  new Word("they may not know", "mogą nie wiedzieć"),
  new Word("taking the lead", "przejąć inicjatywę"),
  new Word("the place is packed", "miejsce jest zatłoczone"),
  new Word("to lurk", "czaić się"),
  new Word("top off", "dopełnić"),
  new Word("transaction fees", "opłaty transakcyjne"),
  new Word("verbose", "gadatliwy"),
  new Word("volatility", "zmienność"),
  new Word("wanderlust", "zamiłowanie do włóczęgi"),
  new Word("ways and means", "sposoby i środki"),
  new Word("water scarcity", "niedobór wody"),
  new Word("we'll get to it", "dojdziemy do tego"),
  new Word("worn out", "zużyte"),
  new Word("vulnerable information", "wrażliwe informacje"),
  new Word("year prior", "rok wcześniej"),
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
    NgIf,
    NgClass
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
  autoNext = true;
  autoRead = false;
  isLoading = false;
  newShuffle = false;
  buttonStatus1: number = 0;
  buttonStatus2: number = 0;
  buttonStatus3: number = 0;
  buttonStatus4: number = 0;
  buttonStatus5: number = 0;
  buttonStatus6: number = 0;
  buttonStatus7: number = 0;
  buttonStatus8: number = 0;
  buttonStatus9: number = 0;
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
      this.answers[0] = this.currentWord.polish;
      for (let i = 1; i < 9; i++) {
        this.answers[i] = this.getAnswer();
      }
    } else {
      this.answers[0] = this.currentWord.english;
      for (let i = 1; i < 9; i++) {
        this.answers[i] = this.getAnswer();
      }
    }
  }

  getAnswer() {
    let answer
    if (this.englishToPolish) {
      do {
        answer = this.initWordsList[this.getRandomIndex(this.initWordsList.length)].polish;
      } while (this.answers.includes(answer))
    } else {
      do {
        answer = this.initWordsList[this.getRandomIndex(this.initWordsList.length)].english;
      } while (this.answers.includes(answer))
    }

    return answer;
  }

  shuffle() {
    this.checkIfListIsEnd();
    this.setLanguage();

    const index = this.getRandomIndex(this.wordsList.length);
    this.currentWord = this.wordsList.splice(index, 1)[0];

    this.createAnswers();
    this.justifyAnswers();

    if (this.autoRead && this.englishToPolish) {
      this.readText();
    }

    if (this.countDown) {
      this.countdownAfterShuffle();
    }

    this.buttonStatus1 = 0;
    this.buttonStatus2 = 0;
    this.buttonStatus3 = 0;
    this.buttonStatus4 = 0;
    this.buttonStatus5 = 0;
    this.buttonStatus6 = 0;
    this.buttonStatus7 = 0;
    this.buttonStatus8 = 0;
    this.buttonStatus9 = 0;

    this.newShuffle = true;
  }

  checkIfListIsEnd() {
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

  justifyAnswers() {
    const sortedAnswers = this.answers.sort((a, b) => a.length - b.length);
    this.answers = [
      sortedAnswers[0],
      sortedAnswers[3],
      sortedAnswers[8],
      sortedAnswers[1],
      sortedAnswers[4],
      sortedAnswers[7],
      sortedAnswers[2],
      sortedAnswers[5],
      sortedAnswers[6]
    ];
  }

  checkAnswer(answer: string, clickedButton: number) {
    if (this.newShuffle) {
      const isCorrect = (word: string, answer: string) => word === answer;
      const updateButtonState = (correctIndex: number) => {

        this.buttonStatus1 = (clickedButton !== correctIndex && clickedButton === 0) ? 2 : 3;
        this.buttonStatus2 = (clickedButton !== correctIndex && clickedButton === 1) ? 2 : 3;
        this.buttonStatus3 = (clickedButton !== correctIndex && clickedButton === 2) ? 2 : 3;
        this.buttonStatus4 = (clickedButton !== correctIndex && clickedButton === 3) ? 2 : 3;
        this.buttonStatus5 = (clickedButton !== correctIndex && clickedButton === 4) ? 2 : 3;
        this.buttonStatus6 = (clickedButton !== correctIndex && clickedButton === 5) ? 2 : 3;
        this.buttonStatus7 = (clickedButton !== correctIndex && clickedButton === 6) ? 2 : 3;
        this.buttonStatus8 = (clickedButton !== correctIndex && clickedButton === 7) ? 2 : 3;
        this.buttonStatus9 = (clickedButton !== correctIndex && clickedButton === 8) ? 2 : 3;

        if (correctIndex === 0) this.buttonStatus1 = 1;
        if (correctIndex === 1) this.buttonStatus2 = 1;
        if (correctIndex === 2) this.buttonStatus3 = 1;
        if (correctIndex === 3) this.buttonStatus4 = 1;
        if (correctIndex === 4) this.buttonStatus5 = 1;
        if (correctIndex === 5) this.buttonStatus6 = 1;
        if (correctIndex === 6) this.buttonStatus7 = 1;
        if (correctIndex === 7) this.buttonStatus8 = 1;
        if (correctIndex === 8) this.buttonStatus9 = 1;
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

      if (this.newShuffle) {
        this.countAnswer(answer);
        this.newShuffle = false;
      }

      if (this.autoNext) {
        this.countdownAfterAnswer();
      }
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

        let englishVoice = voices.find(
          voice => voice.lang === 'en-US' && voice.name.includes('Google')
        );

        if (!englishVoice) {
          englishVoice = voices.find(voice => voice.lang.startsWith('en'));
        }

        if (englishVoice) {
          speech.voice = englishVoice;
        } else {
          console.warn('No English voice found on this system.');
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

  settingsToggle() {
    this.settings = !this.settings;
  }
}
