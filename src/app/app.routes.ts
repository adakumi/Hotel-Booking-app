import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoomsComponent } from './components/rooms/rooms.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent
  },
  { 
    path: 'rooms', 
    component: RoomsComponent
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];