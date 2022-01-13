import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({ selector: 'app-logout', templateUrl: './logout.component.html', styleUrls: ['./logout.component.css'] })
export class LogoutComponent implements OnInit {
  constructor(protected router: Router, private cookieService: CookieService) {}
  public ngOnInit(): void {}
  public logout(): void {
    this.cookieService.delete('token');
    this.router.navigateByUrl('/login');
  }
}
