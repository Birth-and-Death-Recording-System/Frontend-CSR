import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SearchBarComponent } from '../../search-bar/search-bar/search-bar.component';
import { AddBirthPageComponent } from '../../add-Birth/pages/add-birth-page/add-birth-page.component';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { BirthService } from '../../services/birth-service.service';


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

  searchTerm: string = ''; // Property to store the search term in

  births: any[] = []; // Property to store the birth data
  error: string = ''; // Property to store error messages
  id: number = 0; // ID of selected birth
  refreshInterval: number = 600000; // Refresh interval in milliseconds (e.g., 60 seconds)
  private refreshSubscription: Subscription | undefined;
  filterData: any[] = [];

  constructor(private birthService: BirthService, private route: ActivatedRoute) {
    console.log(this.searchTerm); // Log the search term to the console
   } // Inject BirthService

  ngOnInit(): void {
    this.loadBirths(); // Call loadBirths method when component initializes
    this.startAutoRefresh();
    this.onSearch(this.searchTerm); // Trigger onSearch function with current value of search term
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm; // Update the search term
    this.filterData = this.births?.filter((birth: any) => {
      const First_Name = birth?.First_Name?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const Last_Name = birth?.Last_Name?.toLowerCase().includes(this.searchTerm.toLowerCase());
      return First_Name || Last_Name
    });
  }


  loadBirths() {
    this.birthService.getAllBirths().subscribe(
      (data: any) => {
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
