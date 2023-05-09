/*
npm install --save ag-grid-community ag-grid-angular
npm install @syncfusion/ej2-angular-spreadsheet --save     ||at termal to download the package
npm install exceljs
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//=======================================
import {HttpClientModule} from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet'; //imported spread module for spreadsheet

import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';


//=======================================
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { Table2Component } from './table2/table2.component';
import { TableComponent } from './table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridComponent } from './ag-grid/ag-grid.component';
//======================================


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    HomeComponent,
    FooterComponent,
    ErrorpageComponent,
    FirstpageComponent,
    Table2Component,
    TableComponent,
    AgGridComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,//0
    AgGridModule,//1
    SpreadsheetAllModule, BrowserAnimationsModule //0




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
