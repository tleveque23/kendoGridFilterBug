import { Injectable } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { Observable, of } from 'rxjs';
import { process } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  testData = [
    {
      bureau: 'G-BOU',
      nom: 'nom1',
      prenom: 'prenom1',
      noDossier: 76547,
      description: 'CCST',
    },
    {
      bureau: 'H-BOU',
      nom: 'nom2',
      prenom: 'prenom2',
      noDossier: 876786,
      description: 'CCST',
    },
    {
      bureau: 'G-RIV',
      nom: 'nom22',
      prenom: 'prenom3',
      noDossier: 6543,
      description: 'Test2',
    },
    {
      bureau: 'G-RIV',
      nom: 'nom3',
      prenom: 'prenom3',
      noDossier: 7652,
      description: 'Test3',
    },
    {
      bureau: 'H-SJ',
      nom: 'nom33',
      prenom: 'prenom4',
      noDossier: 7676,
      description: 'Test3',
    },
    {
      bureau: 'H-SJ',
      nom: 'nom333',
      prenom: 'prenom5',
      noDossier: 76567,
      description: 'Test2',
    },
  ];

  constructor() {}

  recherche(
    kendoState: State,
  ): Observable<GridDataResult> {
    // On the full app, we are calling the backend API here....

    // const descriptor: any = {
    //   logic: 'and',
    //   filters: [],
    // };


    // if (kendoState.filter) {
    //   for (let filter of kendoState.filter.filters as FilterDescriptor[]) {
    //     descriptor.filters.push({
    //       field: filter.field,
    //       operator: filter.operator,
    //       value: filter.value,
    //     });
    //   }
    // }

    const result = process(this.testData, kendoState);

    return of(result);
  }
}
