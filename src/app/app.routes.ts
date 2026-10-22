import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { CartComponent } from './cart/cart';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' }
];