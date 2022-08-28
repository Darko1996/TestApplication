import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HomeComponent} from "./home.component";
import {NewsService} from "./news.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SharedLoaderService} from "../shared/services/shared-loader.service";
import {ChangeDetectorRef} from "@angular/core";
import {of} from "rxjs";
import {News} from "./news.model";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let newsService: NewsService;
  let router: Router;

  beforeEach(async () => {
    let newsServiceMock = {
      getNews: jest.fn(),
      onNewsChange: jest.fn()
    }
    let loaderMock = {
      showFullLoader: jest.fn(),
      dismissLoader: jest.fn()
    }
    let routerMock = {
      navigate: jest.fn()
    }
    let toastrMock = {
      error: jest.fn()
    }
    let changeDetectorMock = {
      detectChanges: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [],
      providers: [
        { provide: NewsService, useValue: newsServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrMock },
        { provide: SharedLoaderService, useValue: loaderMock },
        { provide: ChangeDetectorRef, useValue: changeDetectorMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsService);
    router = TestBed.inject(Router);
  });

  const news: News[] = [
    {
      id: 1,
      title: "Second US coronavirus wave 'could be even worse'",
      place: "Spain",
      description: "Some description.",
      image: "someImage.jpg"
    }
  ]

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call ngOnInit', (done: jest.DoneCallback) => {
      jest.spyOn(newsService, 'onNewsChange').mockReturnValue(of('usa'));

      component.ngOnInit();

      newsService.onNewsChange().subscribe(text => {
        expect(text).toBeDefined();
        done();
      })
    });
  });

  describe('getNews', () => {
    it('should call getNews', (done: jest.DoneCallback) => {
      component.searchedText = 'usa';
      jest.spyOn(newsService, 'getNews').mockReturnValue(of(news) as any);

      component.getNews();

      newsService.getNews(component.searchedText).subscribe(news => {
        expect(news).toBeDefined();
        done();
      })
    });
  });

  describe('redirectToNewsDetails', () => {
    it('should navigate to news-details', () => {
      const navigateSpy = jest.spyOn(router,'navigate');

      component.redirectToNewsDetails(news[0]);

      expect(navigateSpy).toHaveBeenCalledWith(['/news-details', news[0].id]);
    });
  });

});
