import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRemove, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SearchBarComponent } from '../../search-bar/search-bar/search-bar.component';
import { AddDeathComponent } from '../../add-death/add-death/add-death.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-death',
  standalone: true,
  imports: [
    SearchBarComponent,
    AddDeathComponent,
    FontAwesomeModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './death.component.html',
  styleUrl: './death.component.css',
})
export class DeathComponent implements OnInit {
  faRemove = faRemove;
  faEdit = faEdit;
  faTrash = faTrash;

  deaths: any[] = []; // Property to store the birth data
  error: string = ''; // Property to store error messages

  constructor(private authService: AuthService) {} // Inject BirthService

  ngOnInit(): void {
    this.loadDeaths(); // Call loadBirths method when component initializes
  }

  loadDeaths() {
    this.authService.getAllDeaths().subscribe(
      (data: any) => {
        // Handle successful response here
        console.log(data); // Log the response data to the console
        this.deaths = data; // Store the birth data
        this.error = ''; // Clear any previous error message
      },
      (error: any) => {
        // Handle error here
        console.error(error); // Log the error to the console
        this.error = 'Failed to load birth data'; // Set error message
        this.deaths = []; // Clear birth data
      }
    );
  }
}
