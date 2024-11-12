import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  signInForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void{
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  onSubmit(): void {
    if(this.signInForm.valid) {
      const {email, password } = this.signInForm.value;
      console.log('Sign-In Data: ', {email});

      this.UserService.signin({email, password}).subscribe({
        next: (res) =>{
          console.log(res);
          this.openSnackBar(res.message);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err.error);
          this.openSnackBar(err.error.message);
        },
        complete: () => {
          console.log("Login Complete")    
          this.router.navigate(['/dashboard']);      
        },
      });
    } else {
      console.log("Validation Failed")
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(`${message}`, 'close', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}