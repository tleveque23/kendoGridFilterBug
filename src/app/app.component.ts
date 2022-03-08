import { Component, OnInit } from '@angular/core';
import {
  DataStateChangeEvent,
  GridDataResult,
} from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { TestDataService } from './test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // @ts-ignore
  gridDossiers: GridDataResult;

  public kendoState: State = {
    skip: 0,
    take: 15,
    sort: [{ field: 'profilPatient.nom', dir: 'asc' }],
    filter: {
      logic: 'and',
      filters: [],
    },
  };

  // @ts-ignore
  bureauList: string[];

  constructor(private testDataService: TestDataService) {
    this.bureauList = ['G-BOU', 'H-BOU', 'G-RIV', 'H-SJ'];
  }

  ngOnInit(): void {
    this.testDataService.recherche(this.kendoState).subscribe((datas) => {
      this.gridDossiers = datas;
    });
  }

  public dataStateChange(state: State): void {
    // console.log(this.kendoState.filter)
    // console.log(state.filter)
    this.kendoState = state;
    this.testDataService.recherche(this.kendoState).subscribe((datas) => {
      this.gridDossiers = datas;
    });
  }

}
