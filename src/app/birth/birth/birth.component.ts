import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SearchBarComponent } from '../../search-bar/search-bar/search-bar.component';
import { AddBirthPageComponent } from '../../add-Birth/pages/add-birth-page/add-birth-page.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-birth',
  standalone: true,
  imports: [
    SearchBarComponent,
    AddBirthPageComponent,
    FontAwesomeModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './birth.component.html',
  styleUrl: './birth.component.css'
})
export class BirthComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;

  births: any[] = []; // Property to store the birth data
  error: string = ''; // Property to store error messages

  constructor(private authService: AuthService) { } // Inject BirthService

  ngOnInit(): void {
    this.loadBirths(); // Call loadBirths method when component initializes
  }

  loadBirths() {
    this.authService.getAllBirths().subscribe(
      (data: any) => {
        // Handle successful response here
        console.log(data); // Log the response data to the console
        this.births = data; // Store the birth data
        this.error = ''; // Clear any previous error message
      },
      (error: any) => {
        // Handle error here
        console.error(error); // Log the error to the console
        this.error = 'Failed to load birth data'; // Set error message
        this.births = []; // Clear birth data
      }
    );
  }
}
