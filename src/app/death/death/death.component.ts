import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRemove, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SearchBarComponent } from '../../search-bar/search-bar/search-bar.component';
import { AddDeathComponent } from '../../add-death/add-death/add-death.component';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { DeathService} from '../../services/death-service.service';

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
  title: string =  'Dashboard';

  faRemove = faRemove;
  faEdit = faEdit;
  faTrash = faTrash;

  deaths: any[] = []; // Property to store the birth data
  error: string = ''; // Property to store error messages
  refreshInterval: number = 600000; // Refresh interval in milliseconds (e.g., 60 seconds)
  private refreshSubscription: Subscription | undefined;
  searchTerm: string = '';
  filterData: any[] = [];


  constructor(private deathService: DeathService, private route: ActivatedRoute) {} // Inject DeathService

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];

    this.loadDeaths(); // Call loadBirths method when component initializes
    this.startAutoRefresh();
    this.onSearch(this.searchTerm);
    console.log(this.searchTerm); // Trigger onSearch function with current value of search term
  }

  loadDeaths() {
    this.deathService.getAllDeaths().subscribe(
      (data: any) => {
        // Handle successful response here
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

  startAutoRefresh() {
    this.refreshSubscription = interval(this.refreshInterval).subscribe(() => {
      this.loadDeaths();
    });
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm; // Update the search term
    this.filterData = this.deaths?.filter((death: any) => {
      const First_Name = death?.first_name?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const Last_Name = death?.surname?.toLowerCase().includes(this.searchTerm.toLowerCase());
      return First_Name || Last_Name
    });
  }


  deleteDeath(id: number){
    this.deathService.deleteDeath(id).subscribe(
      (data: any) => {
        // Handle successful response here
        console.log(data); // Log the response data to the console
        this.deaths = data; // Store the birth data
        this.error = ''; // Clear any previous error message
        this.loadDeaths(); // Reload the page after adding a birth
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
