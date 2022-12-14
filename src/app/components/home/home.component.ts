import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {slideIn} from "../../animations";
import {News} from "./news.model";
import {NewsService} from "./news.service";
import {SharedLoaderService} from "../shared/services/shared-loader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideIn]
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject();
  allNews = Array<News>();
  searchedText: string;
  news: News[];
  showSmallLoader: boolean;

  constructor(private newsService: NewsService,
              private router: Router,
              private toastr: ToastrService,
              private loader: SharedLoaderService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loader.showFullLoader();

    this.newsService.onNewsChange().pipe(takeUntil(this.onDestroy)).subscribe((text: string) => {
      this.searchedText = text;
      this.getNews();
    });
  }

  getNews(): void {
    this.showSmallLoader = true;

    this.newsService.getNews(this.searchedText).pipe(
      finalize( () => {
        this.loader.dismissLoader();
        this.showSmallLoader = false
        this.changeDetector.detectChanges();
      })).subscribe((data: News[]) => {
      this.news = data;
      },(err) => {
        this.toastr.error(err);
      });
  }

  redirectToNewsDetails(news: News): void {
    this.router.navigate(['/news-details', news.id]);
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }
}
