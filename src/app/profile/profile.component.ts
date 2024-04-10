import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, RouterOutlet, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  profileData: any;
  profileid: number = 0;
  route: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.getProfileData();
    this.profileForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      birth_date: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],
      gender: ['', Validators.required],
    }); // Initialize the profileForm with form controls and validators

    this.getProfileData();
  }

  onSubmit() {
    const updatedProfileData = this.profileForm.value;
    const userId = this.authService.getUserId();
    const id = parseInt(userId!, 10);
    updatedProfileData.user = id;
    this.http
      .put(`http://localhost:8000/profile/`, updatedProfileData)
      .subscribe(
        (data: any) => {
          console.log('Profile updated successfully', data);
        },
        (error: any) => {
          console.error('Error updateing profile', error);
        }
      );
  }

  getProfileData() {
    this.authService.getProfileDetail().subscribe({
      next: (data: any) => {
        console.log(data);

        this.profileForm.patchValue({
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          birth_date: data.birth_date,
          email: data.email,
          phone_number: data.phone_number,
          gender: data.gender,
        });
      },
    });
  }

  updateProfileData() {
    this.authService.updateProfileData(this.profileForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        // this.route.navigate(['profile'])
      },
    });
  }
}
