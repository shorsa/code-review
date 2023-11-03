import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnDestroy {
  @Input() searchText: string = '';
  @Input() clearButton: boolean = false;
  @Output() searchTextChange = new EventEmitter<string | undefined>();

  private searchSubject: Subject<string>;

  constructor() {
    this.searchSubject = new Subject();
    this.setSearchSubscription();
  }

  changeValue(): void {
    this.searchSubject.next(this.searchText);
  }

  clearSearch(): void {
    this.searchText = '';
    this.searchTextChange.emit(undefined);
  }

  setSearchSubscription(): void {
    this.searchSubject
      .pipe(
        debounceTime(800),
        map((emittedValue) => emittedValue),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.searchTextChange.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }
}
