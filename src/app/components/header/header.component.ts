import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  openMobMenu: boolean

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('News App');
  }

  openMobMenuToggle(): void {
    this.openMobMenu = !this.openMobMenu;
  }

  setPageTitle(title: string): void {
    this.titleService.setTitle('News App | ' + title);
  }
}
