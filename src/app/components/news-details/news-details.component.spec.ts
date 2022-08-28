import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SharedLoaderService} from "../shared/services/shared-loader.service";
import {ChangeDetectorRef} from "@angular/core";
import {of} from "rxjs";
import {NewsDetailsComponent} from "./news-details.component";
import {NewsDetailsService} from "./news-details.service";
import {News} from "../home/news.model";

describe('HomeComponent', () => {
  let component: NewsDetailsComponent;
  let fixture: ComponentFixture<NewsDetailsComponent>;
  let newsDetailsService: NewsDetailsService;

  let activatedRouteMock = {
    snapshot: { paramMap: convertToParamMap({ id: 1 }) }
  }

  beforeEach(async () => {
    let newsDetailsServiceMock = {
      getNewsDetail: jest.fn()
    }
    let loaderMock = {
      showFullLoader: jest.fn(),
      dismissLoader: jest.fn()
    }
    let toastrMock = {
      error: jest.fn()
    }
    let changeDetectorMock = {
      detectChanges: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [NewsDetailsComponent],
      imports: [],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: NewsDetailsService, useValue: newsDetailsServiceMock },
        { provide: SharedLoaderService, useValue: loaderMock },
        { provide: ToastrService, useValue: toastrMock },
        { provide: ChangeDetectorRef, useValue: changeDetectorMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailsComponent);
    component = fixture.componentInstance;
    newsDetailsService = TestBed.inject(NewsDetailsService);
  });

  const news: News =  {
    id: 1,
    title: "Second US coronavirus wave 'could be even worse'",
    place: "Spain",
    description: "Some description.",
    image: "someImage.jpg"
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get params', () => {
      component.newsId = activatedRouteMock.snapshot.paramMap;
      jest.spyOn(newsDetailsService, 'getNewsDetail').mockReturnValue(of(news) as any);

      component.ngOnInit();

      expect(component.newsId).toBeDefined();
    });

    it('should call getCharacterDetail', () => {
      jest.spyOn(newsDetailsService, 'getNewsDetail').mockReturnValue(of(news) as any);

      component.ngOnInit()

      expect(newsDetailsService.getNewsDetail).toHaveBeenCalled();
      expect(component.news).toBeDefined();
    });
  });

  describe('getCharacterDetail', () => {
    it('should call getCharacterDetail', (done: jest.DoneCallback) => {
      jest.spyOn(newsDetailsService, 'getNewsDetail').mockReturnValue(of(news) as any);

      component.getCharacterDetail();

      newsDetailsService.getNewsDetail(news.id).subscribe(news => {
        expect(news).toBeDefined();
        done();
      })
    });
  });
});
