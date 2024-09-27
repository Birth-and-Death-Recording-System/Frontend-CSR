import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { PageTitleService } from '../../../Services/page-title-service.service';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [],
  providers: [Router],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.css'
})
export class PageTitleComponent implements OnInit {
  title: string = ''; // Default title
  // title = this.authService.getTitle();

  user = this.authService.getUsername();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private pageTitleService: PageTitleService ) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
  }
}
