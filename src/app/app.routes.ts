import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './Pages/Dashboard/dashboard/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AddBirthPageComponent } from './add-Birth/pages/add-birth-page/add-birth-page.component';
import { BirthComponent } from './birth/birth/birth.component';
import { DeathComponent } from './death/death/death.component';
import { AddDeathComponent } from './add-death/add-death/add-death.component';
import { ProfileComponent } from './profile/profile.component';
import { EditBirthComponent } from './edit-birth/edit-birth/edit-birth.component';

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
        title: 'Home'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Home'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile'
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
          {
            path: 'edit-birth/:id',
            component: EditBirthComponent,
            title: 'Edit Birth',
          },
        ],
        title: 'Birth',
      },
      {
        path: 'death',
        component: DeathComponent,
        children: [
          {
            path: 'add-death',
            component: AddDeathComponent,
            title: 'Add Death',
          },
        ],
        title: 'Death',
      },
    ],
  },
];
