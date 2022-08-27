import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: async () => (await import('./components/home/home.module')).HomeModule,
  },
  {
    path: 'news-details/:id',
    loadChildren: async () => (await import('./components/news-details/news-details.module')).NewsModule,
  },
  {path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
