import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Words, PeriodicElement } from '../util/words';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.css']
})
export class Tab2Component implements OnInit {
  formdata !: FormGroup
  randomWord !: PeriodicElement;
  shownWord !: String;
  solution !: String;
  started = false;
  wordsCreated = false;
  showSuccess = false;
  showError = false;
  showNextWord = false;

  constructor() { }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      id: new FormControl(),
      word: new FormControl(),
    });
  }

  public start = () => {
    this.started = true;
    this.getNextWord();
  }

  private getNextWord = () => {
    console.log('test');
    this.randomWord = Words.getRandomWord();
    console.log(this.randomWord);
    if (Math.random() < 0.5) {
      this.shownWord = this.randomWord.de;
      this.solution = this.randomWord.en;
    } else {
      this.shownWord = this.randomWord.en;
      this.solution = this.randomWord.de;
    }
  }

  public submit = () => {
    if (this.formdata.value.word !== null) {
      if (this.formdata.value.word === this.solution) {
        this.showSuccess = true;
      } else {
        this.showError = true;
      }
      this.showNextWord = true;
      this.formdata.reset();
    }
  }

  public nextWord = () => {
    this.showSuccess = this.showError = this.showNextWord = false;
    this.getNextWord();
  }

  public refresh = () => this.wordsCreated = Words.ELEMENT_DATA.length > 0;
}