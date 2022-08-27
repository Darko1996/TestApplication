import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-shared-search',
  templateUrl: './shared-search.component.html',
  styleUrls: ['./shared-search.component.scss']
})

export class SharedSearchComponent implements OnInit {
  @Input() set searchText(v: string) { this._searchText = v; }
  @Output() textOut = new EventEmitter<any>();
  @Output() searchTextChange = new EventEmitter();
  get searchText() { return this._searchText; }
  _searchText: string;

  constructor() { }

  ngOnInit(): void {}

  textChanged(): void {
    this.textOut.emit(this.searchText);
  }

  clearSearch() {
    this._searchText = '';
    this.textOut.emit(this.searchText);
  }
}
