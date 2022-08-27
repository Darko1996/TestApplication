import { NgModule } from '@angular/core';
import {HomeComponent} from "./home.component";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "./home-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    FormsModule,
    NgxPaginationModule,
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
