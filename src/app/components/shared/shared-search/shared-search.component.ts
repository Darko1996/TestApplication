import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {News} from "../../../models/news";
import {SearchOption} from "../../../models/search-option";

@Component({
  selector: 'app-shared-search',
  templateUrl: './shared-search.component.html',
  styleUrls: ['./shared-search.component.scss']
})

export class SharedSearchComponent implements OnInit {
  @Input() set searchText(v: string) { this._searchText = v; }
  @Input() open = true;
  @Input() items: News[] = [];
  @Output() textOut = new EventEmitter<any>();
  @Output() searchTextChange = new EventEmitter();
  @Output() selectOption = new EventEmitter<SearchOption>();
  get searchText() { return this._searchText; }

  _searchText: string;
  filteredOptions: SearchOption[];
  isOpen = false;
  options: SearchOption[] = [];

  constructor() { }

  ngOnInit(): void {}

  textChanged(): void {
    this.textOut.emit(this.searchText);
    const selOption = this.items.find(c => c?.place.includes(this._searchText));
    this.options = [];

    if (selOption) {
      this.options.push({ id: selOption?.id, name: selOption?.place });
    }
    this.filterOptions();
  }

  onClick(item: SearchOption) {
    this.isOpen = false;
    this.selectOption.emit(item);
    this._searchText = item.name;
  }

  clearSearch() {
    this._searchText = '';
    this.isOpen = false;
    this.textOut.emit(this.searchText);
  }

  filterOptions() {
    if (this._searchText && this._searchText.length > 0) {
      this.isOpen = true;
      this.filteredOptions = [];
      this.filteredOptions = this.options;
    } else {
      this.isOpen = false;
    }
  }

  notFound() {
    this.isOpen = false;
  }
}
