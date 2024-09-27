import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login/login.component';
import { DashboardComponent } from './Pages/Dashboard/dashboard/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AddBirthPageComponent } from './Components/add-Birth/pages/add-birth-page/add-birth-page.component';
import { BirthComponent } from './Pages/birth/birth/birth.component';
import { DeathComponent } from './Pages/death/death/death.component';
import { AddDeathComponent } from './Components/add-death/add-death/add-death.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { EditBirthComponent } from './Components/edit-birth/edit-birth/edit-birth.component';
import { EditDeathComponent } from './Components/edit-death/edit-death.component';

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
        component: DashboardComponent,
        data: { title: 'Home' }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Home' }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Profile' }
      },
      {
        path: 'birth',
        component: BirthComponent,
        data: { title: 'Birth' },
        children: [
          {
            path: 'add-birth',
            component: AddBirthPageComponent,
            data: { title: 'Add Birth' }
          },
          {
            path: 'edit-birth/:id',
            component: EditBirthComponent,
            data: { title: 'Edit Birth' }
          }
        ],
      },
      {
        path: 'death',
        component: DeathComponent,
        data: { title: 'Death' },
        children: [
          {
            path: 'add-death',
            component: AddDeathComponent,
            data: { title: 'Add Death' }
          },
          {
            path: 'edit-death/:id',
            component: EditDeathComponent,
            data: { title: 'Edit Death' }
          },
        ],
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'birth',
    component: BirthComponent,
    data: { title: 'Birth' }
  },
  {
    path: 'death',
    component: DeathComponent,
    data: { title: 'Death' }
  },
];
