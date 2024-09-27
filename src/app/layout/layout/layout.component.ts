import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../Components/header/header/header.component';
import { SidenavComponent } from '../../Components/sidenav/sidenav/sidenav.component';
import { User } from '../../interface/authInterface';
import { PageTitleComponent } from '../../Components/page-title/page-title/page-title.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ HeaderComponent, SidenavComponent, RouterOutlet, PageTitleComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  userData?: User;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('userData');
      if (userData !== null) {
        this.userData = JSON.parse(userData);
      }
    }
    const page = this.router.url.slice(1);

  }

}
