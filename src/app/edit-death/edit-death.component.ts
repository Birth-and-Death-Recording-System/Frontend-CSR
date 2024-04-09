import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeathService } from '../services/death-service.service';
import { faRemove, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-edit-death',
  standalone: true,
  imports: [
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './edit-death.component.html',
  styleUrl: './edit-death.component.css',
})
export class EditDeathComponent implements OnInit {
  deathid: number = 0;
  deathForm!: FormGroup;
  faTimes = faTimes;
  faRemove = faRemove;

  countries: any[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private activate: ActivatedRoute,
    private deathService: DeathService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activate.params.subscribe((params: any) => {
      this.deathid = parseInt(params.id) ?? 0;
    });

    this.http
      .get('https://restcountries.com/v3.1/all')
      .subscribe((data: any) => {
        this.countries = data.sort((a: any, b: any) =>
          a.name.common.localeCompare(b.name.common)
        );
      });

    this.deathForm = this.fb.group({
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
    });

    this.getDeathData();
  }

  getDeathData() {
    this.deathService.getDeathDetails(this.deathid).subscribe({
      next: (data: any) => {
        console.log(data);

        this.deathForm.patchValue({
          surname: data.surname,
          first_name: data.first_name,
          Other_name: data.Other_name,
          birth_date: data.birth_date,
          Gender: data.Gender,
          Burial_Status: data.Burial_Status,
          Nationality: data.Nationality,
          ID_Type: data.ID_Type,
          ID_Number: data.ID_Number,
          Residence_addr: data.Residence_addr,
          date: data.date,
          Cause_of_Death: data.Cause_of_Death,
          Place_of_Death: data.Place_of_Death,
          Address_of_place: data.Address_of_place,
          Informant_Name: data.Informant_Name,
          Informant_ID_Type: data.Informant_ID_Type,
          Informant_ID_Number: data.Informant_ID_Number,
          Relationship_Type: data.Relationship_Type,
          Phone_Number: data.Phone_Number,
          Email_Address: data.Email_Address,
        });
      },
    });
  }

  updateDeathData() {
    this.deathService.updateDeathData(this.deathForm.value, this.deathid).subscribe({
        next: (data: any) => {
          console.log(data);
          this.route.navigate(['/death']);
          console.log('Death record updated successfully');
        },
      });
  }
}
