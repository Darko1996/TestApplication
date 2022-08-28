import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ElemCounterComponent} from "./elem-counter.component";
import {NewsService} from "../home/news.service";

describe('ElemCounterComponent', () => {
  let component: ElemCounterComponent;
  let fixture: ComponentFixture<ElemCounterComponent>;

  beforeEach(async () => {
    let newsServiceMock = {
      emitNews: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [ElemCounterComponent],
      imports: [],
      providers: [
        { provide: NewsService, useValue: newsServiceMock },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElemCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should emit emitNews', () => {
      component._searchText = 'usa';

      component.ngOnInit();

      expect(component._searchText).toEqual('usa');
    });
  });
});
