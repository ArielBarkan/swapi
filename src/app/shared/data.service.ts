import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apiService: ApiService) { }

  getDataForApp = async () => {
    let myData = await this.apiService.getData();
    const people = myData[0];
    const planets = myData[1];
    const vehicles = myData[2];
    const planetsChart = this.buildPlanetsForChart(planets.chart);
    const topVehicle = await this.buildVehiclesStats(vehicles, people, planets);
    const dataForApp = {
      people,
      planets,
      vehicles,
      planetsChart,
      topVehicle,
    }
    return dataForApp;
  };

  buildPlanetsForChart = (planets: any) => {
    planets.sort(function (a: any, b: any) {
      var keyA = parseFloat(a.population),
        keyB = parseFloat(b.population);
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
    return planets;
  }

  buildVehiclesStats = async (vehicles: any, people: any, planets: any) => {
    const vehiclesStats = {
      winner: {
        URL: '',
        population: 0,
        name: '',
        drivers: <any>[],
        planets: <any>[]
      },
      results: <any>[]
    }
    for (const key in vehicles) {

      if (vehicles[key].drivers.length > 0) {
        let temDrivers = <any>[];
        let temPlanets = <any>[];
        let thisVehicleSumPopulation: number = 0;
        vehicles[key].drivers.forEach((driverURL: any) => {

          let driverData = people[driverURL];
          let planetData = planets[driverData.homeworld];


          let tempPopulation = parseFloat(planetData.population);
          if (tempPopulation !== NaN) {
            thisVehicleSumPopulation += tempPopulation;
          }

          temPlanets.push({ name: planetData.name, population: planetData.population });
          temDrivers.push(driverData.name)
        });

        let vehicleData: Object = {
          vehicleID: vehicles[key].url,
          vehicleName: vehicles[key].name,
          vehiclePlanetsPopulation: thisVehicleSumPopulation,
          drivers: temDrivers,
          planets: temPlanets
        }

        if (thisVehicleSumPopulation > vehiclesStats.winner.population) {
          vehiclesStats.winner.population = thisVehicleSumPopulation;
          vehiclesStats.winner.URL = vehicles[key].url;
          vehiclesStats.winner.name = vehicles[key].name;
          vehiclesStats.winner.drivers = temDrivers;
          vehiclesStats.winner.planets = temPlanets;
        }
        vehiclesStats.results.push(vehicleData);
      }
    }
    return vehiclesStats;
  }

}
