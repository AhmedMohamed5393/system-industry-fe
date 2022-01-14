import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { storeProvider } from '../../providers/app.provider';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({ selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css'] })
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public userNameFormControl: any;
  public passwordFormControl: any;
  constructor(private router: Router, private provider: storeProvider, private cookieService: CookieService) {}
  public ngOnInit(): void {
    this.userNameFormControl = new FormControl('', [Validators.required]);
    this.passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }
  public validateInputs(): boolean {
    const requiredValidation = !this.userNameFormControl.hasError('required') && !this.passwordFormControl.hasError('required');
    const passwordValidation = !this.passwordFormControl.hasError('minLength');
    return requiredValidation && passwordValidation;
  }
  public signin(): void {
    const user = { username: this.username, password: this.password };
    this.provider.login$(user).subscribe((res: any) => {
      if (res && res.token) {
        this.cookieService.set('token', res.token);
        this.router.navigateByUrl('/');
      }
    });
  }
}
