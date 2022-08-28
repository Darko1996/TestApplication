import {ElemCounterComponent} from "./elem-counter.component";
import {NewsService} from "../home/news.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";

describe('ElemCounterComponent', () => {
  let fixture: ElemCounterComponent;

  beforeEach(() => {

    fixture = new ElemCounterComponent();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });
});
