import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchHelper<T = string> {
  private searchSubject: Subject<T>;

  constructor() {
    this.searchSubject = new Subject();
    this.setSearchSubscription();
  }

  searchNext(inputValue: T): void {
    this.searchSubject.next(inputValue);
  }

  setSearchSubscription(): Observable<T> {
    return this.searchSubject.pipe(
      debounceTime(800),
      map((emittedValue) => emittedValue),
      distinctUntilChanged()
    );
  }
}
