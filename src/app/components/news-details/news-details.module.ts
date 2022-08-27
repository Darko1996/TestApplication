import { NgModule } from '@angular/core';
import {NewsDetailsComponent} from "./news-details.component";
import {CommonModule} from "@angular/common";
import {NewsDetailsRoutingModuleTsModule} from "./news-details-routing.module.ts.module";

@NgModule({
  declarations: [
    NewsDetailsComponent
  ],
  imports: [
    CommonModule,
    NewsDetailsRoutingModuleTsModule
  ]
})
export class NewsModule { }
