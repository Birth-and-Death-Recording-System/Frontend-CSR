import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SearchBarComponent } from '../../search-bar/search-bar/search-bar.component';
import { AddBirthPageComponent } from '../../add-Birth/pages/add-birth-page/add-birth-page.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { BirthServiceService } from '../../services/birth-service.service';


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
  id: number = 0; // ID of selected birth
  refreshInterval: number = 50000; // Refresh interval in milliseconds (e.g., 60 seconds)
  private refreshSubscription: Subscription | undefined;

  constructor(private birthService: BirthServiceService) { } // Inject BirthService

  ngOnInit(): void {
    this.loadBirths(); // Call loadBirths method when component initializes
    this.startAutoRefresh();
  }

  loadBirths() {
    this.birthService.getAllBirths().subscribe(
      (data: any) => {
        // Handle successful response here
        console.log(data); // Log the response data to the consolez
        this.births = data; // Store the birth data
        this.error = ''; // Clear any previous error message
        // this.loadBirths(); // Reload the page after adding a birth
      },
      (error: any) => {
        // Handle error here
        console.error(error); // Log the error to the console
        this.error = 'Failed to load birth data'; // Set error message
        this.births = []; // Clear birth data
      }
    );
  }

  startAutoRefresh() {
    this.refreshSubscription = interval(this.refreshInterval).subscribe(() => {
      this.loadBirths();
    });
  }
  
  updateBirthRecord(updatedData: any, id: number) {
    this.birthService.updateBirth(updatedData, id).subscribe(
      (response: any) => {
        console.log('Birth record updated successfully:', response);
        // Optionally, perform any additional actions after successful update
        this.loadBirths(); // Refresh the birth list after updating
      },
      (error: any) => {
        console.error('Error updating birth record:', error);
        // Optionally, display an error message or handle the error in UI
      }
    );
  }
  

  deleteBirth(id: number){
    this.birthService.deleteBirth(id).subscribe(
      (data: any) => {
        // Handle successful response here
        console.log(data); // Log the response data to the console
        this.births = data; // Store the birth data
        this.error = ''; // Clear any previous error message
        this.loadBirths(); // Reload the page after deleting a birth
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
