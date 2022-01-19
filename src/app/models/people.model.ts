import { Vehicle } from "./vehicle.model";

export class People {
  private name: string;
  private url: string;
  private vehicles: Array<Vehicle>;
  private homeworld: string;

  constructor(name: string, url: string, vehicles: Array<Vehicle>, homeworld: string) {
    this.name = name;
    this.url = url;
    this.vehicles = vehicles;
    this.homeworld = homeworld;
  }
}

