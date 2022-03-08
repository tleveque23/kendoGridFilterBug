import { Component, Input } from '@angular/core';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import {
  BaseFilterCellComponent,
  localizeOperators
} from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import {
  FilterComponent
} from '@progress/kendo-angular-grid/dist/es2015/filtering/filter-component.interface';
import {ColumnComponent, FilterService} from '@progress/kendo-angular-grid';

const stringOperators = localizeOperators({
  "filterContainsOperator": "contains",
  "filterNotContainsOperator": "doesnotcontain",
  "filterEqOperator": "eq",
  "filterNotEqOperator": "neq",
  "filterStartsWithOperator": "startswith",
  "filterEndsWithOperator": "endswith",
  "filterIsNullOperator": "isnull",
  "filterIsNotNullOperator": "isnotnull",
  "filterIsEmptyOperator": "isempty",
  "filterIsNotEmptyOperator": "isnotempty"
});

/**
 * @hidden
 */
@Component({
  selector: 'my-dropdown-filter',
  template: `
    <span class="k-filtercell">
      <kendo-grid-filter-wrapper-cell
        [column]="column"
        [filter]="filter"
        [operators]="operators"
        [showOperators]="showOperators">

            <kendo-dropdownlist
              style="flex: 1 1 auto"
              kendoFilterInput
              [data]="data"
              [valuePrimitive]="true"
              [valueField]="valueField"
              [textField]="valueField"
              [defaultItem]="defaultItem"
              [(value)]="value"
            >
            </kendo-dropdownlist>
      </kendo-grid-filter-wrapper-cell>
    </span>
    `
})
export class DropDownListFilterComponent extends BaseFilterCellComponent implements FilterComponent {

  @Input() public showOperators: boolean = true;
  @Input() public column: ColumnComponent;
  @Input() public override filter: CompositeFilterDescriptor;
  @Input() public data: any[];

  @Input() public set valueField(value: string) {
    this._valueField = value;
  }

  public get valueField(): string {
    return this._valueField ? this._valueField : this.column.field;
  }

  public get currentFilter(): FilterDescriptor {
    return this.filterByField(this.column.field);
  }

  public get currentOperator(): string {
    return this.currentFilter ? <string>this.currentFilter.operator : "contains";
  }

  public get defaultItem(): any {
    return {
      [this.valueField]: '',
      [this.valueField]: null
    };
  }

  protected override defaultOperators: Array<{ text: string, value: string }> = stringOperators(this.localization);

  private _valueField: string;
  value: any;

  constructor(
    filterService: FilterService,
    column: ColumnComponent,
    protected localization: LocalizationService
  ) {
    super(filterService);
    this.column = column;

    // We want to clear the value of the dropdown if the new state does not contain the current field
    filterService.changes.subscribe( filterDesc => {
      if( ! (filterDesc.filters as FilterDescriptor[]).find( s => s.field === this.valueField) ) {
        this.value = null
      }
    })
  }
}
