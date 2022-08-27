import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {NewsService} from "../../services/news.service";
import {News} from "../../models/news";
import {SearchOption} from "../../models/search-option";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() selectedSymbol = new EventEmitter<string>();

  private onDestroy = new Subject();
  $search = new Subject<string>();
  openMobMenu: boolean;
  _searchText: string;
  allNews = Array<News>();

  constructor(private titlePage: Title, private newsService: NewsService, private router: Router) { }

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

  openMobMenuToggle(): void {
    this.openMobMenu = !this.openMobMenu;
  }

  setPageTitle(title: string): void {
    this.titlePage.setTitle('News App | '  + title);
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
