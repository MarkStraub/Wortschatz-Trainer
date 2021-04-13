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

  /**
   * Starts the training
   *
   * @public
   */
  public start = () => {
    this.started = true;
    this.getNextWord();
  }

  /**
   * Gets the next training word
   *
   * @private
   */
  private getNextWord = () => {
    this.randomWord = Words.getRandomWord();
    if (Math.random() < 0.5) {
      this.shownWord = this.randomWord.de;
      this.solution = this.randomWord.en;
    } else {
      this.shownWord = this.randomWord.en;
      this.solution = this.randomWord.de;
    }
  }

  /**
   * Submits the entered word
   *
   * @public
   */ 
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

  /**
   * Presents the next word
   *  
   * @public
   */
  public nextWord = () => {
    this.showSuccess = this.showError = this.showNextWord = false;
    this.getNextWord();
  }

  /**
   * Refreshs the table
   *
   * @public
   */
  public refresh = () => this.wordsCreated = Words.ELEMENT_DATA.length > 0;
}