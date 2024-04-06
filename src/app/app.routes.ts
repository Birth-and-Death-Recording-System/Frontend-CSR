import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './Pages/Dashboard/dashboard/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AddBirthPageComponent } from './add-Birth/pages/add-birth-page/add-birth-page.component';
import { BirthComponent } from './birth/birth/birth.component';

export const routes: Routes = [
  {
      path: '',
      component: LoginComponent,
      title: 'Login',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'birth',
        component: BirthComponent,
        children: [
          {
            path: 'add-birth',
            component: AddBirthPageComponent,
            title: 'Add Birth',
          },
        ],
        title: 'Birth',
      },
      
    ],
    title: 'Home',
    
  }
];
