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

  constructor(private authService: AuthService, private router: Router) {}

  // logout(): void {
  //   this.authService.logout().subscribe(
  //     () => {
  //       // Clear any stored user data or tokens
  //       sessionStorage.removeItem('token')
  //       // Redirect to the login page or any other desired page
  //       this.router.navigate(['/login']);
  //     },
  //     (error: any) => {
  //       // Handle error
  //       console.error('Logout failed:', error);
  //     }
  //   );
  // }
}
