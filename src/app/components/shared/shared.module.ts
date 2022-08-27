import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedLoaderComponent} from "./shared-loader/shared-loader.component";
import {SharedSearchComponent} from "./shared-search/shared-search.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    SharedLoaderComponent,
    SharedSearchComponent,
  ],
  exports: [
    SharedSearchComponent,
    SharedLoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule { }
