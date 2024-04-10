import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Observable, catchError, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BirthService } from '../../services/birth-service.service';

@Component({
  selector: 'app-edit-birth',
  standalone: true,
  imports: [
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './edit-birth.component.html',
  styleUrl: './edit-birth.component.css',
})
export class EditBirthComponent implements OnInit {
  faTimes = faTimes;

  // birthData: any;
  countries: any[] = [];
  birthForm!: FormGroup; // Define form group for birth details
  birthid: number = 0;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private activate: ActivatedRoute,
    private birthService: BirthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activate.params.subscribe((params: any) => {
      this.birthid = parseInt(params.id) ?? 0;
      console.log(this.birthid);
    });

    this.http
      .get('https://restcountries.com/v3.1/all')
      .subscribe((data: any) => {
        this.countries = data.sort((a: any, b: any) =>
          a.name.common.localeCompare(b.name.common)
        );
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
      Father_Nationality: [''],
      Father_ID_type: ['', Validators.required],
      Father_ID_Number: ['', Validators.required],
      Father_DOB: ['', Validators.required],
      Father_Phone_Number: ['', Validators.required],
      Mother_First_Name: ['', Validators.required],
      Mother_Last_Name: ['', Validators.required],
      Mother_Nationality: [''],
      Mother_ID_type: ['', Validators.required],
      Mother_ID_number: ['', Validators.required],
      Mother_DOB: ['', Validators.required],
      Mother_Phone_Number: ['', Validators.required],
    });

    this.getBirthData();
  }

  getBirthData() {
    this.birthService.getbirthDetails(this.birthid).subscribe({
      next: (data: any) => {
        console.log(data);

        this.birthForm.patchValue({
          First_Name: data.First_Name,
          Last_Name: data.Last_Name,
          Other_Name: data.Other_Name,
          date: data.date,
          gender: data.gender,
          City: data.City,
          Place_of_Birth: data.Place_of_Birth,
          Informant_name: data.Informant_name,
          Relationship: data.Relationship,
          Informant_Phone_Number: data.Informant_Phone_Number,
          Father_First_Name: data.Father_First_Name,
          Father_Last_Name: data.Father_Last_Name,
          Father_Nationality: data.Father_Nationality,
          Father_ID_type: data.Father_ID_type,
          Father_ID_Number: data.Father_ID_Number,
          Father_DOB: data.Father_DOB,
          Father_Phone_Number: data.Father_Phone_Number,
          Mother_First_Name: data.Mother_First_Name,
          Mother_Last_Name: data.Mother_Last_Name,
          Mother_Nationality: data.Mother_Nationality,
          Mother_ID_type: data.Mother_ID_type,
          Mother_ID_number: data.Mother_ID_number,
          Mother_DOB: data.Mother_DOB,
          Mother_Phone_Number: data.Mother_Phone_Number,
        });
      },
    });
  }

  updateBirthData() {
    this.birthService
      .updateBirthDeatils(this.birthForm.value, this.birthid)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.route.navigate(['/birth']);
          alert('Birth record updated successfully');
        },
      });
  }
}
