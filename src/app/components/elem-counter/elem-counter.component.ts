import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {News} from "../home/news.model";
import {NewsService} from "../home/news.service";

@Component({
  selector: 'app-elem-counter',
  templateUrl: './elem-counter.component.html',
  styleUrls: ['./elem-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElemCounterComponent implements OnInit, OnDestroy {
  @Input() newsCounter = Array<News>();

  private onDestroy = new Subject();
  $search = new Subject<string>();
  _searchText: string;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.$search.pipe(
      debounceTime(500),
      takeUntil(this.onDestroy),
      distinctUntilChanged())
      .subscribe((text: string) => {
        this._searchText = text;
        this.newsService.emitNews(this._searchText);
      });
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
