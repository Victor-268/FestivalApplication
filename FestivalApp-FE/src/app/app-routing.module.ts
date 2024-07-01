import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { DjsComponent } from './djs/djs.component';
import { DjDetailComponent } from './dj-detail/dj-detail.component';
import {PerformancesComponent} from "./performances/performances.component";
import {ReviewsComponent} from "./reviews/reviews.component";

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'detail/:id', component: DjDetailComponent },
  { path: 'djs', component: DjsComponent },
  { path: 'performances', component: PerformancesComponent },
  { path: 'reviews', component: ReviewsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
