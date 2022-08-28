import { NgModule } from '@angular/core';
import {HomeComponent} from "./home.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "./home-routing.module";
import {SharedModule} from "../shared/shared.module";
import {ElemCounterComponent} from "../elem-counter/elem-counter.component";

@NgModule({
  declarations: [
    HomeComponent,
    ElemCounterComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
