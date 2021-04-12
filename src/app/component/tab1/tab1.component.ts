import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement, Words } from '../util/words'


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.css']
})
export class Tab1Component {
  displayedColumns: string[] = ['action', 'de', 'en'];
  dataSource = new MatTableDataSource(Words.ELEMENT_DATA);
  isAsc = true;
  formdata !: FormGroup

  constructor(private formBuilder: FormBuilder) {
    Words.ELEMENT_DATA.sort((a, b) => {
      return (a.de < b.de ? -1 : 1) * (this.isAsc ? 1 : -1);
    });
  }

  ngOnInit() {
    this.formdata = new FormGroup({
      id: new FormControl(),
      de: new FormControl(),
      en: new FormControl(),
    });
  }

  /**
   * Reverse the table
   *
   * @public
   */
  public sort = () => {
    this.isAsc = !this.isAsc;
    this.sortData();
  }

  /**
   * Sorts the table
   *
   * @private
   */
  private sortData = () => {
    Words.ELEMENT_DATA.sort((a, b) => {
      return (a.de.toLowerCase() < b.de.toLowerCase() ? -1 : 1) * (this.isAsc ? 1 : -1);
    });
    this.refresh();
  }

  /**
   * Submits the entered word
   *
   * @public
   */
  public submit = () => {
    if (this.formdata.valid) {
      console.log(this.formdata.value);

      // Check if the words are to add or update
      if (this.formdata.value.id === null) {
        Words.add(this.formdata.value.de, this.formdata.value.en);
      } else {
        Words.update(this.formdata.value.id, this.formdata.value.de, this.formdata.value.en);
      }

      this.sortData();
      this.formdata.reset();
    }
  }

  /**
   * Edites a word
   *
   * @param {PeriodicElement} data The word to be removed
   * @public
   */
  public editWords = (data: PeriodicElement) => {
    this.formdata.setValue({
      id: data.id,
      de: data.de,
      en: data.en
    });
  }

  /**
   * Removes a word
   *
   * @param {PeriodicElement} data The word to be removed
   * @public
   */
  public removeWords = (data: PeriodicElement) => {
    Words.remove(data.id);
    this.refresh();
  }

  /**
   * Adds some example words
   *
   * @public
   */
  public addExampleData = () => {
    Words.addExampleData();
    this.refresh();
    return false;
  }

  /**
   * Resets the words
   *
   * @public
   */
  public resetData = () => {
    Words.resetData();
    this.refresh();
  }

  /**
   * Submits the entered word
   *
   * @public
   */
  public refresh = () => this.dataSource = new MatTableDataSource(Words.ELEMENT_DATA);
}
