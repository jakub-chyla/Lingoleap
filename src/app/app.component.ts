import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {Word} from "./word";
import {FormsModule} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgClass, NgForOf, NgIf} from "@angular/common";

const wordsList: Word[] = [
  new Word("abbreviation", "skrót"),
  new Word("acquaintance", "znajomy"),
  new Word("allege", "twierdzić"),
  new Word("assessment", "ocena"),
  new Word("attitude", "nastawienie"),
  new Word("augmented reality", "rozszerzona rzeczywistość"),
  new Word("apprentice", "praktykant"),
  new Word("according to", "według"),
  new Word("advocated", "popierał"),
  new Word("aforementioned", "wyżej wymieniony"),
  new Word("abundance", "obfitość"),
  new Word("ambiguous", "dwuznaczny"),
  new Word("assault", "napaść"),
  new Word("adjacent", "przyległy"),
  new Word("assault", "napaść"),
  new Word("audacious", "zuchwały"),
  new Word("anytime soon", "w najbliższym czasie"),
  new Word("apparent", "pozorny"),
  new Word("acquisition", "nabytek"),
  new Word("arson", "podpalenie"),
  new Word("alleged shooter", "rzekomy strzelec"),
  new Word("broadly in line", "w dużej mierze zgodne"),
  new Word("bum", "włóczęga"),
  new Word("backlog", "zaległości"),
  new Word("be on time", "być na czas"),
  new Word("be in time", "być w porę"),
  new Word("barren", "jałowy"),
  new Word("besides", "oprócz"),
  new Word("bark", "kora"),
  new Word("bevel", "ukos"),
  new Word("burglary", "włamanie"),
  new Word("be competent", "być kompetentnym"),
  new Word("cherished", "ceniony"),
  new Word("citation", "cytat"),
  new Word("contradict", "zaprzeczać"),
  new Word("clerk", "urzędnik"),
  new Word("crucial", "kluczowy"),
  new Word("consonant", "spółgłoska"),
  new Word("combating", "zwalczanie"),
  new Word("crime", "przestępstwo"),
  new Word("confess", "wyznać"),
  new Word("carnivore", "mięsożerny"),
  new Word("comprehensive", "wyczerpujący"),
  new Word("cannon fodder", "mięso armatnie"),
  new Word("conducted by", "prowadzone przez"),
  new Word("consistent", "konsekwentny"),
  new Word("contrary", "przeciwnie"),
  new Word("coup", "zamach stanu"),
  new Word("counterfeit", "podróbka"),
  new Word("counterpart", "odpowiednik"),
  new Word("characteristic traits", "cechy charakterystyczne"),
  new Word("delightful", "zachwycający"),
  new Word("doctor order", "zalecenie lekarza"),
  new Word("dodge", "unik"),
  new Word("disposable", "jednorazowe"),
  new Word("decision backfired", "decyzja okazała się nieskuteczna"),
  new Word("disposable income", "dochód rozporządzalny"),
  new Word("day following event", "dzień po wydarzeniu"),
  new Word("despite an effort", "pomimo wysiłku"),
  new Word("disease outbreak", "wybuch epidemii"),
  new Word("despicable", "nikczemny"),
  new Word("distinguish", "wyróżnić"),
  new Word("deterrence", "odstraszenie"),
  new Word("diminish", "zmniejszać"),
  new Word("designated", "wyznaczony"),
  new Word("discrepancy", "rozbieżność"),
  new Word("distortion", "zniekształcenie"),
  new Word("duke", "książę"),
  new Word("detour", "objazd"),
  new Word("desert", "pustynia"),
  new Word("emboldened", "ośmielony"),
  new Word("dessert", "deser"),
  new Word("depleted", "wyczerpany"),
  new Word("debris", "gruz"),
  new Word("emphasis", "podkreślenie"),
  new Word("elaborate", "wyszukany"),
  new Word("entrepreneur", "przedsiębiorca"),
  new Word("enlightenment", "oświecenie"),
  new Word("entire world", "cały świat"),
  new Word("eventually", "ostatecznie"),
  new Word("efficacy", "skuteczność"),
  new Word("for quite some time", "przez jakiś czas"),
  new Word("frugal", "osczędny"),
  new Word("flip it over", "odwróć to"),
  new Word("facilitate", "ułatwiać"),
  new Word("from hindsight", "z perspektywy czasu"),
  new Word("felony", "zbrodnia"),
  new Word("frankly", "szczerze mówiąc"),
  new Word("flooding aftermath", "skutki powodzi"),
  new Word("former cook", "były kucharz"),
  new Word("gather", "zbierać"),
  new Word("genesis", "geneza"),
  new Word("give me a ride", "podwieź mnie"),
  new Word("genre", "kategoria"),
  new Word("grout tiles", "płytki z fugą"),
  new Word("grim", "ponury"),
  new Word("gripping", "porywający"),
  new Word("get access", "uzyskąc dostęp"),
  new Word("grieving", "opłakiwać"),
  new Word("holidaymakers", "wczasowicze"),
  new Word("hourly rate", "stawka godzinowa"),
  new Word("however", "jednakże"),
  new Word("heir", "spadkobierca"),
  new Word("herbivore", "roślinożerca"),
  new Word("hijinks", "wybryki"),
  new Word("hush money", "pieniądze za ciszę"),
  new Word("high hopes", "wielkie nadzieje"),
  new Word("imposter", "oszust"),
  new Word("irrelevant", "nieistotny"),
  new Word("it concerns me", "to mnie dotyczy"),
  new Word("incentives", "zachęty"),
  new Word("in the black sea", "na Morzu Czarnym"),
  new Word("incomprehensible", "niezrozumiały"),
  new Word("internship", "staż"),
  new Word("intimidating", "onieśmielający"),
  new Word("I'm interested in an offer", "Jestem zainteresowany ofertą"),
  new Word("intentional", "umyślny"),
  new Word("international affairs", "sprawy międzynarodowe"),
  new Word("imply", "sugerować"),
  new Word("invite", "zapraszać"),
  new Word("invade", "wtargnąć"),
  new Word("invaders", "najeźdźcy"),
  new Word("in all cost", "za wszelką cenę"),
  new Word("invidious", "nienawistny"),
  new Word("intended", "przeznaczony"),
  new Word("it's been a while", "minęło trochę czasu"),
  new Word("it's not over", "to nie koniec"),
  new Word("like any other", "jak każdy inny"),
  new Word("lurk", "czaić się"),
  new Word("lure", "zwabić"),
  new Word("like no other", "jak żaden inny"),
  new Word("loan collateral", "zabezpieczenie pożyczki"),
  new Word("jeopardize", "narazić"),
  new Word("manhunt", "obława"),
  new Word("miserable", "nieszczęśliwy"),
  new Word("merchant", "kupiec"),
  new Word("mock", "przedrzeźniać"),
  new Word("multiple", "wiele"),
  new Word("mourning", "żałoba"),
  new Word("neglect", "zaniedbanie"),
  new Word("notice", "wypowiedzenie"),
  new Word("non-disclosure agreement", "umowa o zachowaniu poufności"),
  new Word("natural calamity", "klęska żywiołowa"),
  new Word("newcomers", "przybysze"),
  new Word("nevertheless", "niemniej jednak"),
  new Word("obnoxious", "obrzydliwy"),
  new Word("oracle", "wyrocznia"),
  new Word("omnivore", "wszystkożerny"),
  new Word("occurred", "wystąpił"),
  new Word("overtake", "wyprzedzać"),
  new Word("pardon my french", "przeprszam za przekleństwa"),
  new Word("persistent", "wytrwały"),
  new Word("persuasive", "przekonywający"),
  new Word("pebbles", "kamyczki"),
  new Word("paid in advance", "zapłacono z góry"),
  new Word("pesticides", "pestycydy"),
  new Word("parasites", "pasożyty"),
  new Word("preservatives", "konserwanty"),
  new Word("pox", "ospa"),
  new Word("plush", "plusz"),
  new Word("prerogative", "przywilej"),
  new Word("police spokesman", "rzecznik policji"),
  new Word("postponed in time", "odroczony w czasie"),
  new Word("peck", "dziobać"),
  new Word("prominent figure", "wybitna postać"),
  new Word("price surge", "wzrost cen"),
  new Word("prioritize", "ustalać priorytety"),
  new Word("pristine", "dziewiczy"),
  new Word("ridge", "grzbiet"),
  new Word("perished", "zginął"),
  new Word("reckon", "myśleć"),
  new Word("repel attack", "odeprzeć atak"),
  new Word("riddle", "zagadka"),
  new Word("regardless", "mimo wszystko"),
  new Word("reconcile", "pojednać"),
  new Word("relentless", "nieustępliwy"),
  new Word("revel in victory", "upajać się zwycięstwem"),
  new Word("resilient", "odporny"),
  new Word("rogue", "łobuz"),
  new Word("retaliation", "odwet"),
  new Word("revenge", "rewanż"),
  new Word("redeem", "odkupić"),
  new Word("relapse addiction", "nawrót uzależnienia"),
  new Word("refers to", "odnosi się do"),
  new Word("rugged", "chropowaty"),
  new Word("ruthless", "bezwzględny"),
  new Word("recap", "podsumowanie"),
  new Word("rosary", "różaniec"),
  new Word("spare money", "pieniądze do wydania"),
  new Word("since inception", "od początku istnienia"),
  new Word("spouse", "współmałżonek"),
  new Word("sprout", "kiełkować"),
  new Word("sludge", "osad"),
  new Word("savage", "okrutny"),
  new Word("seizures", "drgawki"),
  new Word("significantly", "znacznie"),
  new Word("something is not right", "coś jest nie tak"),
  new Word("salvation", "zbawienie"),
  new Word("slurp", "śorbać"),
  new Word("statement", "stwierdzenie"),
  new Word("scoot over", "przesuń się"),
  new Word("sophisticated", "wyrafinowany"),
  new Word("swept under a rug", "zamiecione pod dywan"),
  new Word("step out", "wyjść"),
  new Word("scatter over", "rozrzucić"),
  new Word("so called", "tak zwany"),
  new Word("smacked myself", "uderzyłem się"),
  new Word("somebody has to", "ktoś musi"),
  new Word("stubborn", "uparty"),
  new Word("sometime", "kiedyś"),
  new Word("summon", "wezwać"),
  new Word("struggling", "zmagać się"),
  new Word("subsidies", "dotacje"),
  new Word("sign a waiver", "podpisać zrzeczenie się"),
  new Word("tangled", "zaplątany"),
  new Word("touch ups", "poprawki"),
  new Word("total loss", "szkoda całkowita"),
  new Word("they may not know", "mogą nie wiedzieć"),
  new Word("take the lead", "przejąć inicjatywę"),
  new Word("the place is packed", "miejsce jest zatłoczone"),
  new Word("top off a glass", "dopełnić szklankę"),
  new Word("transaction fees", "opłaty transakcyjne"),
  new Word("troops", "grupa żołnierzy"),
  new Word("trip over", "potknąć się"),
  new Word("verbose", "gadatliwy"),
  new Word("viable", "wykonalny"),
  new Word("vineyard", "winnica"),
  new Word("variety", "różnorodność"),
  new Word("this very moment", "właśnie ta chwila"),
  new Word("volatility", "zmienność"),
  new Word("vulnerable information", "wrażliwe informacje"),
  new Word("wanderlust", "zamiłowanie do włóczęgi"),
  new Word("workaround", "obejście problemu"),
  new Word("wedge", "klin"),
  new Word("wig", "peruka"),
  new Word("wick", "knot"),
  new Word("wrap ups", "podsumowanie"),
  new Word("we did so", "zrobiliśmy to"),
  new Word("work is a backdrop of story", "praca jest tłem opowieści"),
  new Word("ways and means", "sposoby i środki"),
  new Word("water scarcity", "niedobór wody"),
  new Word("we'll get to it", "dojdziemy do tego"),
  new Word("worn out", "zużyte"),
  new Word("year prior", "rok wcześniej"),
  new Word("you heard that right", "dobrze słyszałeś"),
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
    NgClass,
    NgForOf
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
  buttonStatuses: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  englishToPolish = false;
  buttonRows: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];

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

    for (let i = 0; i < this.buttonStatuses.length; i++) {
      this.buttonStatuses[i] = 0;
    }

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
    }, 400);
  }

  justifyAnswers() {
    const sortAnswer = this.answers.sort((a, b) => a.length - b.length);
    this.answers = [sortAnswer[0], sortAnswer[3], sortAnswer[8], sortAnswer[1], sortAnswer[4], sortAnswer[7], sortAnswer[2], sortAnswer[5], sortAnswer[6]];
  }

  checkAnswer(answer: string, clickedButton: number) {
    if (this.newShuffle) {
      const isCorrect = (word: string, answer: string) => word === answer;
      const updateButtonState = (correctIndex: number) => {

        for (let i = 0; i < this.buttonStatuses.length; i++) {
          if (i === correctIndex) {
            this.buttonStatuses[i] = 1; // Correct answer
          } else if (i === clickedButton && clickedButton !== correctIndex) {
            this.buttonStatuses[i] = 2; // Wrong answer
          } else {
            this.buttonStatuses[i] = 3; // Disabled
          }
        }
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
