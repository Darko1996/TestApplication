import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  openMobMenu: boolean

  constructor(private titlePage: Title) { }

  ngOnInit(): void {}

  openMobMenuToggle(): void {
    this.openMobMenu = !this.openMobMenu;
  }

  setPageTitle(title: string): void {
    this.titlePage.setTitle('News App | '  + title);
  }


}
