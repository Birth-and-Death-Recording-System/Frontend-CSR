import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-birth',
  standalone: true,
  imports: [FontAwesomeModule, HttpClientModule, ReactiveFormsModule, MatSelectCountryModule, CommonModule],
  templateUrl: './add-birth-page.component.html',
  styleUrl: './add-birth-page.component.css'
})
export class AddBirthPageComponent implements OnInit {
 faTimes= faTimes;

 dataSource: any[] = [];
 countries: any[] = [];
  birthForm!: FormGroup; // Define form group for birth details

  // token = localStorage.getItem('authToken'); // Declare token variable

  faRemove = faTimes;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  token = this.authService.getToken();
  // token = localStorage.getItem('authToken');

  ngOnInit(): void {
    this.http.get('https://restcountries.com/v3.1/all').subscribe((data: any) => {
      this.countries = data.sort((a:any,b:any)=> a.name.common.localeCompare(b.name.common))
    });
    // Initialize the birthForm with form controls and validators
    this.birthForm = this.fb.group({
      First_Name: ['', Validators.required],
      Last_Name: ['', Validators.required],
      Other_Name: ['', Validators.required],
      date: ['', [Validators.required]],
      gender: ['', Validators.required],
      City: ['', Validators.required],
      Place_of_Birth: ['', Validators.required],
      Informant_name: ['', Validators.required],
      Relationship: ['', Validators.required],
      Informant_Phone_Number: ['', Validators.required],
      Father_First_Name: ['', Validators.required],
      Father_Last_Name: ['', Validators.required],
      Father_Nationality: ['', ],
      Father_ID_type: ['', Validators.required],
      Father_ID_Number: ['', Validators.required],
      Father_DOB: ['', Validators.required],
      Father_Phone_Number: ['', Validators.required],
      Mother_First_Name: ['', Validators.required],
      Mother_Last_Name: ['', Validators.required],
      Mother_Nationality: ['', ],
      Mother_ID_type: ['', Validators.required],
      Mother_ID_number: ['', Validators.required],
      Mother_DOB: ['', Validators.required],
      Mother_Phone_Number: ['', Validators.required],

      
    });

    // Make request to API using token if needed
    
  }

  // validateDate(control: FormControl): { [key: string]: any } | null {
  //   const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(control.value);
  //   return isValidDate ? null : { 'invalidDate': true };
  // }

 


  onSubmit(): void {
    const birthData = this.birthForm.value;
    console.log(birthData,'jjdj')
    this.authService.submitBirthData(birthData).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
   
  }
}
