import { Component, Input, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../interface/authInterface';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBarComponent } from '../../search-bar/search-bar/search-bar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SearchBarComponent, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  @Input() userData?: User;
  faUser = faUser;
  user = this.authService.getUsername();
  constructor(private authService : AuthService){

  }

  ngOnInit(): void {
    // console.log(this.userData);


  }
}
