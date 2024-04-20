import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SignInData } from '../../../interface/authInterface';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    HttpClientModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const signInData: SignInData = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!,
      };
      this.authService.signIn(signInData).subscribe({
        next: (response: any) => {
          alert("Login Successful")
          console.log(response);
          this.isLoading = false;
          sessionStorage.setItem('token', response.token);
          this.router.navigate(['home']);
          // this.authService.token = response.token;
        },
        error: (error: any) => {
          alert("Enter valid  credentials")
          console.log(error);
          this.isLoading = false;
        },
      });
    }
  }
}
