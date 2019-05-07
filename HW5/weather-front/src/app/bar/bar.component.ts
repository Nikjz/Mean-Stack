import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../googleAuth/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})

export class BarComponent implements OnInit, OnDestroy{
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;

  constructor(private authService: AuthService, public http: HttpClient) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogin() {
    this.http.get('http://localhost:3000/auth/google', { withCredentials: true })
      .subscribe((postData) => {
        console.log(postData);
        this.authService.login();
      });
  }

  onLogout() {
    this.http.get('http://localhost:3000/auth/logout', { withCredentials: true })
    .subscribe((postData) => {
      console.log(postData);
      this.authService.logout();
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
