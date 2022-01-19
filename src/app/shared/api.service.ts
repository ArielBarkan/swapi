import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = { headers: new HttpHeaders({}) };
  apiBaseUrl = 'https://swapi.py4e.com/api/';

  constructor(private http: HttpClient) {
    console.log("api service is here");
  }

  getData = async () => {
    return Promise.all([this.getAllPeople(), this.getAllPlanets(), this.getAllVehicles()]).then((results) => {
      return results;
    });
  }

  getSingleVehicle = async (id: string) => {

    let result: any = await this.fetchURL(id);
    return result;
  }
  getAllPlanets = async () => {
    const planetsToFilter = [
      'https://swapi.py4e.com/api/planets/1/',
      'https://swapi.py4e.com/api/planets/2/',
      'https://swapi.py4e.com/api/planets/6/',
      'https://swapi.py4e.com/api/planets/7/',
      'https://swapi.py4e.com/api/planets/8/',
    ]

    let url: string = this.apiBaseUrl + 'planets';
    let next = true;
    const planetsArray: any = {
      chart: []
    };
    do {
      let result: any = await this.fetchURL(url);
      let planets = result.results;
      for (const key in planets) {
        const planet: Object = {
          name: planets[key].name,
          population: planets[key].population
        }
        planetsArray[planets[key].url] = planet;
        // if planet is in the chart (Part 2) we adding the planet to the chart array
        if (planetsToFilter.includes(planets[key].url)) {
          planetsArray.chart.push(planet);
        }
      }
      if (!result.next) {
        next = false;
      } else {
        url = result.next;
      }
    } while (next);
    return planetsArray;
  }
  getAllPeople = async () => {
    let url: string = this.apiBaseUrl + 'people';
    let next = true;
    const peopleArray: any = [];
    do {
      let result: any = await this.fetchURL(url);
      let people = result.results;
      for (const key in people) {
        const person: Object = {
          name: people[key].name,
          vehicles: people[key].vehicles,
          homeworld: people[key].homeworld,
        }
        peopleArray[people[key].url] = person;
      }
      if (!result.next) {
        next = false;
      } else {
        url = result.next;
      }
    } while (next);
    return peopleArray;
  }

  getAllVehicles = async () => {
    let url: string = this.apiBaseUrl + 'vehicles';
    let next = true;
    const vehiclesArray: Array<any> = [];
    do {
      let result: any = await this.fetchURL(url);
      let vehicles = result.results;
      for (const key in vehicles) {
        const vehicle: Object = {
          name: vehicles[key].name,
          url: vehicles[key].url,
          drivers: vehicles[key].pilots,
        }
        vehiclesArray.push(vehicle)
      }
      if (!result.next) {
        next = false;
      } else {
        url = result.next;
      }
    } while (next);
    return vehiclesArray;
  }


  fetchURL = async (url: string) => {
    let result = new Promise((resolve, reject) => {
      this.http.get<any>(url).subscribe(data => {
        resolve(data);
      })
    });
    return result;
  }
}


