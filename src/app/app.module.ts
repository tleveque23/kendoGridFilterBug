import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GridModule, RowFilterModule} from '@progress/kendo-angular-grid';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import {DropDownListFilterComponent} from './dropDownListFilterComponent';

@NgModule({
  declarations: [
    AppComponent,
    DropDownListFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GridModule,
    DropDownsModule, ButtonsModule,
    RowFilterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
