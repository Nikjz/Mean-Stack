import { Component, OnInit } from '@angular/core';
import {Person} from '../person';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  person: Person = {
    city: "mumbai",
    name: "Niks"
  };

  constructor() { }

  ngOnInit(): void {
      this.person.name = localStorage.getItem("name");
      this.person.city = localStorage.getItem("city");
  }

  onClick(): void {
      localStorage.setItem("name", this.person.name);
      localStorage.setItem("city", this.person.city)
  }
}
