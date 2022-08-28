import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemCounterComponent } from './elem-counter.component';

describe('ElemCounterComponent', () => {
  let component: ElemCounterComponent;
  let fixture: ComponentFixture<ElemCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElemCounterComponent ]
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
});
