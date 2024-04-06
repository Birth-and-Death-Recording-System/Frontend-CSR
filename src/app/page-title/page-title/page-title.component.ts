import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../../interface/authInterface';

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

  userData?: User;

  constructor() {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('userData');
      if (userData !== null) {
        this.userData = JSON.parse(userData);
      }
    }
  }
}
