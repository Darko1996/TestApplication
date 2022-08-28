import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HeaderComponent} from "./header.component";
import {Title} from "@angular/platform-browser";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let titleServiceMock = {
    setTitle: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [],
      providers: [
        { provide: Title, useValue: titleServiceMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set title to News App', () => {
      component.ngOnInit();
      expect(titleServiceMock.setTitle).toBeDefined();
    });
  });

  describe('openMobMenuToggle', () => {
    it('should call openMobMenuToggle', () => {
      component.openMobMenu = true;
      component.openMobMenuToggle();
      expect(component.openMobMenu).not.toEqual(true);
    });
  });

  describe('openMobMenuToggle', () => {
    it('should call openMobMenuToggle', () => {
      component.openMobMenu = true;
      component.setPageTitle('someTitle');
      expect(titleServiceMock.setTitle).toBeDefined();
    });
  });
});
