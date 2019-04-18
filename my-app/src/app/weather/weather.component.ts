import { Component, OnInit } from '@angular/core';
import {WeatherServiceService} from '../weather-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private weatherService: WeatherServiceService) { }
  pressure = localStorage.getItem('pressure');

  ngOnInit() {
  }

  onSelect(): void {
    this.weatherService.getPollutants().subscribe(data => {

        this.pressure = (data['main'].temp);
        localStorage.setItem("pressure", this.pressure)

    });
  }

}

