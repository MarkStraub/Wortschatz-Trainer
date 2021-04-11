import { Component, Host, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AppComponent } from 'src/app/app.component';
import { AnswerElement, ANSWER_DATA, Exam } from '../util/exam';
import { PeriodicElement, Words } from '../util/words';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.css']
})
export class Tab3Component implements OnInit {
  displayedColumns: string[] = ['word', 'solution', 'answer', 'correct'];
  dataSource = new MatTableDataSource(ANSWER_DATA);
  formdata!: FormGroup;
  started = false;
  result = false;
  wordsCreated = false;
  exam!: Exam;
  shownWord: string | undefined;
  solution: string | undefined;
  currentIndex = 0;
  size = 0;
  correctAnswers = 0;

  // https://stackoverflow.com/questions/35267146/accessing-a-property-in-a-parent-component
  // constructor(@Host parent: AppComponent) { }
  constructor(@Inject(AppComponent) private parent: AppComponent) { }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      id: new FormControl(),
      word: new FormControl(),
    });
  }

  public start = () => {
    this.parent.examStarted = this.started = true;
    this.result = false;

    this.exam = new Exam();
    this.size = this.exam.size();
    this.getNextWord();
    this.currentIndex = 1;
    this.correctAnswers = 0;
    ANSWER_DATA.splice(1, ANSWER_DATA.length);
  }

  private getNextWord = () => {
    var word = this.exam.getNextWord();
    if (word === undefined) {
      this.showResult();
      return;
    }
    if (Math.random() < 0.5) {
      this.shownWord = word?.de;
      this.solution = word?.en;
    } else {
      this.shownWord = word?.en;
      this.solution = word?.de;
    }

    ANSWER_DATA.push({ word: this.shownWord, solution: this.solution, answer: '', correct: false });
  }

  private showResult = () => {
    this.parent.examStarted = this.started = false;
    this.result = true;
    ANSWER_DATA.forEach((e: AnswerElement) => {
      this.correctAnswers += e.correct ? 1 : 0;
    });

    this.dataSource = new MatTableDataSource(ANSWER_DATA);
  }

  public submit = () => {
    if (this.formdata.value.word !== null) {
      ANSWER_DATA[this.currentIndex - 1].answer = this.formdata.value.word;
      ANSWER_DATA[this.currentIndex++ - 1].correct = this.formdata.value.word === this.solution;
      this.getNextWord();
      this.formdata.reset();
    }
  }

  public cancel = () => {
    this.parent.examStarted = this.started = false;
    this.formdata.reset();
  }

  public refresh = () => this.wordsCreated = Words.ELEMENT_DATA.length > 0;
}
