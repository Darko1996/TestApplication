import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../ngrx/app.reducer';
import {SharedLoaderService} from "../services/shared-loader.service";

@Component({
  selector: 'app-shared-loader',
  templateUrl: './shared-loader.component.html',
  styleUrls: ['./shared-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedLoaderComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject();

  showFull = false;
  mainText: string;

  constructor(
    private loaderService: SharedLoaderService,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private store: Store<fromApp.State>) {}

  ngOnInit() {
    this.store
      .select(fromApp.getLoaderState)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((value: any) => {
        this.showFull = value?.loader?.type === SharedLoaderService.FULL;
        this.changeDetector.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  closeLoader(): void {
    this.loaderService.dismissLoader();
  }
}
