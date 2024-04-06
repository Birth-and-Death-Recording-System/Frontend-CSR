import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SearchBarComponent } from '../../search-bar/search-bar/search-bar.component';
import { AddBirthPageComponent } from '../../add-Birth/pages/add-birth-page/add-birth-page.component';

@Component({
  selector: 'app-birth',
  standalone: true,
  imports: [
    SearchBarComponent,
    AddBirthPageComponent,
    FontAwesomeModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './birth.component.html',
  styleUrl: './birth.component.css'
})
export class BirthComponent {
  faEdit = faEdit;
  faTrash = faTrash;
}
