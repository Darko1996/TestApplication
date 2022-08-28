import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, Subject, takeUntil} from "rxjs";
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
  allNews = Array<News>();
  private onDestroy = new Subject();
  searchedText: string;
  news: News[];
  currentPage = 1;
  pageSize = 4;
  total = 0;
  offset = 0;
  showSmallLoader: boolean;

  constructor(private newsService: NewsService,
              private router: Router,
              private toastr: ToastrService,
              private loader: SharedLoaderService) { }

  ngOnInit(): void {
    this.loader.showFullLoader();

    this.newsService.onNewsChange().pipe(takeUntil(this.onDestroy)).subscribe((text: string) => {
      this.searchedText = text;
      this.getNews();
    });
  }

  getNews(): void {
    this.showSmallLoader = true;
    this.offset = (this.currentPage - 1) * this.pageSize;

    this.newsService.getNews(this.searchedText, this.pageSize, this.currentPage, this.total).pipe(
      finalize( () => {
        this.loader.dismissLoader();
        this.showSmallLoader = false
      })).subscribe((data: News[]) => {
      this.news = data;
      this.total = data.length;
    },(err) => {
        this.toastr.error(err);
      });
  }

  pageChangeEvent(event: any){
    this.currentPage = event;
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
