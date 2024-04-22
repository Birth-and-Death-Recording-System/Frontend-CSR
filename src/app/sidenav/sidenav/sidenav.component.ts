import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  title: string = 'Dashboard';

  activeItem: string | null = null;

  setActiveItem(item: string): void {
    this.activeItem = item;
  }

  constructor(private authService: AuthService, private router: Router) { }

  setTitle(newTitle: string) {
    this.title = newTitle;
  }

  /// Method to trigger logout
  onLogout(): void {
    this.authService.logout();
  }
}
