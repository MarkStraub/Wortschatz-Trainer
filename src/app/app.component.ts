import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Tab2Component } from './component/tab2/tab2.component';
import { Tab3Component } from './component/tab3/tab3.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(Tab2Component) private tap2Component!: Tab2Component;
  @ViewChild(Tab3Component) private tab3Component!: Tab3Component;
  title = 'vocabulary-trainer';
  private _examStarted = false;

  // Update data on tabchange
  onTabChanged(event: MatTabChangeEvent) {
    switch (event.index) {
      case 1:
        this.tap2Component.refresh();
        break;
      case 2:
        this.tab3Component.refresh();
        break;
      default:
        break;
    }
  }

  public set examStarted(started: boolean) { this._examStarted = started };
  public get examStarted() { return this._examStarted };
}