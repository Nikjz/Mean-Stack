import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  private userUpdate = new Subject<User>();
  private user: User = null;

  constructor(private http: HttpClient, private router: Router) {}

  getUser() {
    this.http
    .get<{message: string; user: any}>('http://localhost:3000/auth/user', { withCredentials: true })
    .subscribe((resUser) => {
      if (resUser.user) {
        this.user = {
          city: resUser.user.thumbnail,
          id: resUser.user._id,
          googleId: resUser.user.googleId,
          name: resUser.user.username
        };
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.userUpdate.next(this.user);
      }
    });
  }

  getUserUpdateListener() {
    return this.userUpdate.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  logout() {
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.user = null;
    this.userUpdate.next(null);
    this.router.navigate(['/']);
  }

  login() {
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    if (this.user) {
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    } else {
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
    }
  }

}

