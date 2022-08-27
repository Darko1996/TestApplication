import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedLoaderComponent} from "./shared-loader/shared-loader.component";
import {SharedSearchComponent} from "./shared-search/shared-search.component";
import {FormsModule} from "@angular/forms";
import { SharedSmallLoaderComponent } from './shared-small-loader/shared-small-loader.component';

@NgModule({
  declarations: [
    SharedLoaderComponent,
    SharedSearchComponent,
    SharedSmallLoaderComponent,
  ],
  exports: [
    SharedSearchComponent,
    SharedLoaderComponent,
    SharedSmallLoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule { }
