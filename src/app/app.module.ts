import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as fromApp from './ngrx/app.reducer';
import { StoreModule } from '@ngrx/store';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./components/shared/shared.module";
import {ToastrModule} from "ngx-toastr";
import {CommonModule} from "@angular/common";
import {HomeModule} from "./components/home/home.module";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        HomeModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(fromApp.reducers)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
