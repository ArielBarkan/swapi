import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit, OnChanges {
  @Input() apiData: any;
  data: any;
  constructor() { }
  ngOnInit(): void { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes?.apiData?.currentValue) {
      this.data = changes.apiData.currentValue.planetsChart;
    }
  }

}
