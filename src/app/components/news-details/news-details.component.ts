import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {finalize} from "rxjs";
import {SharedLoaderService} from "../shared/services/shared-loader.service";
import {ToastrService} from "ngx-toastr";
import {slideIn} from "../../animations";
import {NewsDetailsService} from "./news-details.service";
import {News} from "../home/news.model";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideIn]
})
export class NewsDetailsComponent implements OnInit {
  news: News;
  newsId: any;
  selectedOption: any;
  title: string;

  constructor(private activatedRoute: ActivatedRoute,
              private newsDetailsService: NewsDetailsService,
              private loader: SharedLoaderService,
              private toastr: ToastrService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.newsId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCharacterDetail();
  }

  getCharacterDetail(): void {
    this.loader.showFullLoader();

    this.newsDetailsService.getNewsDetail(this.newsId).pipe(
      finalize( () => {
        this.loader.dismissLoader();
        this.changeDetector.detectChanges();
      }))
      .subscribe((data: News) => {
      console.log('news-detail', data);
      this.news = data;
      },(err) => {
        this.toastr.error(err);
      });
  }

  select(data: any, title: string): void {
    this.title = title;
    this.selectedOption = data.items;
  }

}
