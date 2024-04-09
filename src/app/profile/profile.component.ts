import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileForm! : FormGroup
  profileData: any

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.getProfileData();
    this.profileForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      username: [''],
      birth_date: [''],
      email: [''],
      phone_number: [''],
      gender: ['']
    }); // Initialize the profileForm with form controls and validators
  }

  getProfileData() {
    return this.http.get(`http://localhost:8000/profile/`).subscribe(
      (data: any) => {
        this.profileData = data
        console.log(data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onSubmit(){
    const updatedProfileData = this.profileForm.value;
    const userId = this.authService.getUserId();
    const id = parseInt(userId!, 10) 
    updatedProfileData.user = id
    this.http.put(`http://localhost:8000/profile/`, updatedProfileData).subscribe(
      (data: any) => {
        console.log("Profile updated successfully", data);
      },
      (error: any) => {
        console.error("Error updateing profile",error);
      }
    );
  }

}
