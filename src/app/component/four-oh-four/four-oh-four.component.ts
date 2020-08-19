import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-four-oh-four',
  templateUrl: './four-oh-four.component.html',
  styleUrls: ['./four-oh-four.component.scss']
})
export class FourOhFourComponent implements OnInit {

  searchText = new Subject();
  filteredOptions: Observable<any[]>;
  options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.searchText.pipe(
      startWith(''),
      map((value: string) => this.filter(value))
    );
  }

  filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: any) => option.label.toLowerCase().includes(filterValue));
  }
}
