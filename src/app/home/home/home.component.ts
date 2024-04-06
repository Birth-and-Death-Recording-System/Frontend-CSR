import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header/header.component';
import { SidenavComponent } from '../../sidenav/sidenav/sidenav.component';
import { DashboardComponent } from '../../Pages/Dashboard/dashboard/dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
