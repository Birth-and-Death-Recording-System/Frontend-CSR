import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeathService } from '../services/death-service.service';

@Component({
  selector: 'app-edit-death',
  standalone: true,
  imports: [],
  templateUrl: './edit-death.component.html',
  styleUrl: './edit-death.component.css'
})
export class EditDeathComponent implements OnInit {

  deathid: number = 0
  deathForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private activate: ActivatedRoute, private deathService: DeathService, 
    private route: Router) { }

  ngOnInit(): void {
    this.activate.params.subscribe((params:any) => {
      
      this.deathid = parseInt(params.id) ?? 0;
      console.log(this.deathid);
    });
  }

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
  })

}
