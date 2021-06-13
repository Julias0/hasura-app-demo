import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  fg?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  onSignIn() {
    if (this.fg?.valid) {
      this.authService.signIn(this.fg.get('email')?.value, this.fg.get('password')?.value).subscribe(()=> {
        this.router.navigate(['/', 'meramenu', 'dashboard']);
      }, (err) => {
        console.log(err);
        if (err.error === 'no email exists') {
          this.snackBar.open('No account Exists', 'error', {
            duration: 1000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
      })
    } else {
      this.fg?.markAllAsTouched();
    }
  }

  onSignUp() {
    this.router.navigate(['/', 'auth', 'sign_up']);
  }
}
