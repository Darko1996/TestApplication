import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shared-small-loader',
  templateUrl: './shared-small-loader.component.html',
  styleUrls: ['./shared-small-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedSmallLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
