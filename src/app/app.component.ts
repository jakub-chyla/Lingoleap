import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {Word} from "./word";

const wordsList: Word[] = [
  new Word("conducted by", "prowadzone przez"),
  new Word("distortion", "zniekształcenie"),
  new Word("neglect", "zaniedbanie"),
  new Word("emphasis", "podkreślenie"),
  new Word("persuasive", "przekonywający"),
  new Word("discrepancy", "rozbieżność"),
  new Word("abbreviation", "skrót"),
  new Word("consistent", "spójny, konsekwentny"),
  new Word("resilient", "odporny"),
  new Word("verbose", "gadatliwy"),
  new Word("persistent", "wytrwały"),
  new Word("imposter", "oszust"),
  new Word("clerk", "urzędnik"),
  new Word("rugged", "chropowaty"),
  new Word("rogue", "łobuz"),
];

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
export class AppComponent implements OnInit {
  wordsList: Word[] = [];
  currentWord!: Word;

  ngOnInit() {
    this.wordsList = wordsList;
    this.displayRandomWord();
  }

  displayRandomWord() {
    const randomIndex = Math.floor(Math.random() * this.wordsList.length);
    this.currentWord = this.wordsList[randomIndex];
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
