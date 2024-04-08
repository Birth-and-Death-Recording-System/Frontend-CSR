import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-death',
  standalone: true,
  imports: [FontAwesomeModule, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-death.component.html',
  styleUrl: './add-death.component.css'
})
export class AddDeathComponent implements OnInit{
  faRemove = faRemove;

  DeathForm!: FormGroup;
  dataSource: any[] = [];
  countries: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.http.get('https://restcountries.com/v3.1/all').subscribe((data: any) => {
      this.countries = data.sort((a:any,b:any)=> a.name.common.localeCompare(b.name.common))
    });
    
      this.DeathForm = this.fb.group({
        surname: ['', Validators.required],
        first_name: ['', Validators.required],
        Other_name: ['', Validators.required],
        birth_date: ['', Validators.required],
        Gender: ['', Validators.required],
        Burial_Status: ['', Validators.required],
        Nationality: ['', Validators.required],
        ID_Type: ['', Validators.required],
        ID_Number: ['', Validators.required],
        Residence_addr: ['', Validators.required],
        date: ['', Validators.required],
        Cause_of_Death: ['', Validators.required],
        Place_of_Death: ['', Validators.required],
        Address_of_place: ['', Validators.required],
        Informant_Name: ['', Validators.required],
        Informant_ID_Type: ['', Validators.required],
        Informant_ID_Number: ['', Validators.required],
        Relationship_Type: ['', Validators.required],
        Phone_Number: ['', Validators.required],
        Email_Address: ['', Validators.required],
      })
  }

  onSubmit(): void {
    const deathData = this.DeathForm.value;
    const userId = this.authService.getUserId();
    const id = parseInt(userId!, 10) 
    deathData.user = id;
    this.authService.submitDeathData(deathData).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
   
  }
}
