import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../../interface/authInterface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.css'
})
export class PageTitleComponent implements OnInit {
  @Input()
  Title?: Title;

  user = this.authService.getUsername();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
