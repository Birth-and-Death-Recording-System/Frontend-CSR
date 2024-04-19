import { Component, Input, OnInit } from '@angular/core';
// import { Title } from '../../interface/authInterface';
// import { User } from '../../interface/authInterface';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

interface RouteData {
  title: string;
}

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [],
  providers: [Router],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.css'
})
export class PageTitleComponent implements OnInit {
  // @Input()
  // Title?: Title;

  user = this.authService.getUsername();

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap((route: { data: any; }) => route.data)
    ).subscribe(data => {
      // Assuming the data property 'title' contains the title for the page
      const pageTitle = data['title'] || 'Default Title';
      this.updatePageTitle(pageTitle);
    });
  }

  updatePageTitle(title: string): void {
    // Update the page title dynamically
    document.title = title;
  }
}
