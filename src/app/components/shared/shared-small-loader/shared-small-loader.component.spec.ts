import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSmallLoaderComponent } from './shared-small-loader.component';

describe('SharedSmallLoaderComponent', () => {
  let component: SharedSmallLoaderComponent;
  let fixture: ComponentFixture<SharedSmallLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedSmallLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSmallLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
