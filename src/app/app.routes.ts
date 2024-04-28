import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { ProductComponent } from './modules/product/product.component';

export const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'newProduct', component: ProductComponent},
  {path:'updateProduct', component: ProductComponent},
  { path: '**', component: NotFoundComponent }
];
