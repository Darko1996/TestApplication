import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {Router} from "@angular/router";
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  $search = new Subject<string>();
  openMobMenu: boolean;
  _searchText: string;

  constructor(private titlePage: Title, private newsService: NewsService, private router: Router) { }

  ngOnInit(): void {
    this.$search.pipe(
      debounceTime(500),
      distinctUntilChanged()).subscribe((text: string) => {
      this._searchText = text.toLowerCase();
      this.newsService.emitNews(this._searchText);
    });
  }

  openMobMenuToggle(): void {
    this.openMobMenu = !this.openMobMenu;
  }

  setPageTitle(title: string): void {
    this.titlePage.setTitle('News App | '  + title);
  }
}
