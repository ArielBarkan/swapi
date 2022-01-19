import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, OnChanges {
  @Input() apiData: any;
  data: any;
  constructor() { }
  ngOnInit(): void { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes?.apiData?.currentValue) {
      this.data = changes.apiData.currentValue.topVehicle.winner;
    }
  }


}

