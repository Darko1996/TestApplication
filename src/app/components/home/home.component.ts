import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, finalize, map, Subject, switchMap, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {slideIn} from "../../animations";
import {News} from "../../models/news";
import {NewsService} from "../../services/news.service";
import {SharedLoaderService} from "../../services/shared-loader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideIn]
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject();
  $search = new Subject<string>();
  searchedText: string;
  news: News[];
  p = 1;
  pageSize = 8;
  total = 0;
  offset = 0;

  constructor(private newsService: NewsService,
              private router: Router,
              private toastr: ToastrService,
              private loader: SharedLoaderService) { }

  ngOnInit(): void {
    this.newsService.onNewsChange().pipe(takeUntil(this.onDestroy)).subscribe((text: string) => {
      this.searchedText = text;
      this.getNews();
    });
  }

  getNews(): void {
    this.loader.showFullLoader();
    this.offset = (this.p - 1) * this.pageSize;

    this.newsService.getNews(this.searchedText, this.pageSize, this.offset).pipe(
      finalize( () => this.loader.dismissLoader())).subscribe((data: News[]) => {
      this.news = data;
      this.total = data.length;
    },(err) => {
        this.toastr.error(err);
      });
  }

  pageChangeEvent(event: any){
    this.p = event;
    this.getNews();
  }

  redirectToNewsDetails(news: News): void {
    this.router.navigate(['/news-details', news.id]);
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
