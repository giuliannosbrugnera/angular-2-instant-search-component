import { Component } from '@angular/core';
import { WikipediaSearchService } from './wikipedia-search.service';
import { Subject } from 'rxjs/Subject';

// application wide shared Rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
  items: Array<string>;
  term$ = new Subject<string>();
  constructor(private service: WikipediaSearchService) {
    this.term$
      .debounceTime(400)
      .distinctUntilChanged()
      .flatMap(term => this.service.search(term))
      .subscribe(results => this.items = results);
  }

  search(term: string) {
    this.service.search(term)
      .subscribe(results => this.items = results);
  }
}