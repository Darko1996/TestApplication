import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {finalize, map} from "rxjs";
import {SharedLoaderService} from "../../services/shared-loader.service";
import {ToastrService} from "ngx-toastr";
import {slideIn} from "../../animations";
import {NewsDetailsService} from "../../services/news-details.service";
import {News} from "../../models/news";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
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
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.newsId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCharacterDetail();
  }

  getCharacterDetail(): void {
    this.loader.showFullLoader();

    this.newsDetailsService.getNewsDetail(this.newsId).pipe(
      map((result => result.data.results[0])),
      finalize( () => this.loader.dismissLoader()))
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
