import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchOption} from "../models/search-option.model";

@Component({
  selector: 'app-shared-search',
  templateUrl: './shared-search.component.html',
  styleUrls: ['./shared-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SharedSearchComponent implements OnInit {
  @Input() set searchText(v: string) { this._searchText = v; }
  @Output() textOut = new EventEmitter<any>();
  @Output() searchTextChange = new EventEmitter();
  get searchText() { return this._searchText; }

  _searchText: string;
  isOpen = false;
  options: SearchOption[] = [];

  constructor() { }

  ngOnInit(): void {}

  textChanged(): void {
    this.textOut.emit(this.searchText);
  }

  clearSearch() {
    this._searchText = '';
    this.isOpen = false;
    this.textOut.emit(this.searchText);
  }

  notFound() {
    this.isOpen = false;
  }
}
