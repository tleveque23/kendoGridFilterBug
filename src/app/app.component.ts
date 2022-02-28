import {Component, OnInit} from '@angular/core';
import {DataStateChangeEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {SortDescriptor, State} from '@progress/kendo-data-query';
import {TestDataService} from './test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // @ts-ignore
  gridDossiers: GridDataResult;

  public kendoState: State = {
    skip: 0,
    take: 15,
    sort: [
      {field: 'profilPatient.nom', dir: 'asc'}
    ],
    filter: {
      logic: 'and',
      filters: [
      ]
    }
  };

  public state = {
    page: 1,
    pageSize: 15,
  }

  // @ts-ignore
  bureauList: string[];


  constructor(private testDataService: TestDataService) {

    this.bureauList = [
      'G-BOU', 'H-BOU', 'G-RIV', 'H-SJ'
    ]
  }

  ngOnInit(): void {

    this.testDataService.recherche(this.kendoState, this.state)
    .subscribe(datas => {
      console.log(datas)
      this.gridDossiers = datas;
    });
  }

  pageChange(event: PageChangeEvent) {
    console.log(event)
  }

  sortChange(event: Array<SortDescriptor>) {
    console.log(event)
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    console.log('Curent filters:')
    console.log(this.kendoState.filter.filters)
    console.log('Change state filters:')
    console.log(state)

    this.kendoState = state;

    this.testDataService.recherche(this.kendoState, this.state)
    .subscribe(datas => {
      this.gridDossiers = datas
    });
  }
}
