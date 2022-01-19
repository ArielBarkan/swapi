import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "my app";
  apiData: any;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    setTimeout(() => {
      this.initData();
    }, 0);
  }

  initData = async () => {
    this.apiData = await this.dataService.getDataForApp();
  }



}
