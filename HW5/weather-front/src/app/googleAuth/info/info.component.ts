import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Weather } from './weather.model';
import { HttpClient} from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit, OnDestroy {
  cityName = '';
  temperature = '';
  user = null;
  private userSub: Subscription;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  http: HttpClient;

  constructor(http: HttpClient, private authService: AuthService) {
    this.http = http;
  }

  ngOnInit() {
    this.authService.getUser();
    this.userSub = this.authService.getUserUpdateListener()
      .subscribe((user) => {
          this.user = user;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      }
    );
  }
  generateTemp() {
    this.http.get<Weather>('http://localhost:3000/weather/info', { withCredentials: true })
      .subscribe((postData) => {
        this.cityName = postData.cityName;
        this.temperature = postData.temperature + '°C';
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
