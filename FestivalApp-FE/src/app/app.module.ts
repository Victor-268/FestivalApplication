import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DjsComponent } from './djs/djs.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from "@angular/forms";
import { DjDetailComponent } from './dj-detail/dj-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { PerformancesComponent } from './performances/performances.component';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    DjsComponent,
    NavbarComponent,
    DjDetailComponent,
    MessagesComponent,
    HomepageComponent,
    PerformancesComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
