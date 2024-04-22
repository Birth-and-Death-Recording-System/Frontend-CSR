import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { PageTitleService } from '../../services/page-title-service.service';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [],
  providers: [Router],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.css'
})
export class PageTitleComponent implements OnInit {
  title: string =  'Dashboard'; // Default title
  // title = this.authService.getTitle();

  user = this.authService.getUsername();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private pageTitleService: PageTitleService ) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
  }
}
