import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {News} from "../../models/news";
import {SearchOption} from "../../models/search-option";
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'app-elem-counter',
  templateUrl: './elem-counter.component.html',
  styleUrls: ['./elem-counter.component.scss']
})
export class ElemCounterComponent implements OnInit, OnDestroy {
  @Input() newsCounter = Array<News>();
  @Output() selectedSymbol = new EventEmitter<string>();

  private onDestroy = new Subject();
  $search = new Subject<string>();
  _searchText: string;
  allNews = Array<News>();

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getAllNews();

    this.$search.pipe(
      debounceTime(500),
      takeUntil(this.onDestroy),
      distinctUntilChanged())
      .subscribe((text: string) => {
        this._searchText = text.toLowerCase();
        this.newsService.emitNews(this._searchText);
      });
  }

  getAllNews(): void {
    this.newsService.getSearchOptions().subscribe((data: News[]) => {
      this.allNews = data;
    })
  }

  selectSymbol(option: SearchOption) {
    this.newsService.emitNews(option.name);
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
