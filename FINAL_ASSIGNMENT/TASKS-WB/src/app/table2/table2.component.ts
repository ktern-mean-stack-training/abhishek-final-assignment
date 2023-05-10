import { Component, ViewChild } from '@angular/core';

//======
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';


//======

import { GridApi, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { formatDate } from '@angular/common';
import { catchError } from 'rxjs';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-table2',
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.scss']
})
export class Table2Component {

  constructor(private http: HttpClient) {}


  columnDefs: any[] = [];
  rowData: any[] = [];

  rowDataObject: any[] =[];

  wbsDataObject: any[]=[];

  //===============TO FETCH THE DATA FROM EXCEL TO AG GRID========================
  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      console.log("at reader")
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.rowData = jsonData;
      if (jsonData.length > 0) {
        this.columnDefs = Object.keys(jsonData[0]).map((header: any) => ({
          headerName: header,
          field: header,
        }));
        console.log(this.columnDefs);
      }
      if (jsonData.length > 1) {
        this.rowData = jsonData
        console.log(this.rowData);
        this.convertDataToObjects();
      }
    };
    reader.readAsArrayBuffer(file);
  }

  //TO CONVERT THE ROW OBJECTS AS OBJECTS
  convertDataToObjects(): void{
    const headers = this.rowData[0]; //first row would be the headers
    this.rowDataObject = this.rowData.slice(1).map((row: any) => {
      const rowDataObject: any = {};
      headers.forEach((header: any, index: number) => {
        rowDataObject[header] = row[index];
      });
      return rowDataObject; //this is what we are going to share now to the backend
    });




    //==========
    console.log("this is row data as an object")
    console.log(this.rowDataObject); //converting the data at ag-grid into an object array
    const variableToSend = this.rowDataObject;
    const wbs = this.insertWBS(variableToSend);
    const api= this.sendVariableToAPI(wbs); //to send the variable to backend
    //==========

  }

  formdate(date:any){

    const parts = date.split('-');
    const day = parts[0];
    const mon = parts[1];
    const year = parts[2];

    let formdated = year +"-"+ mon+"-"+day

    return formdated
  }


  insertWBS(variable:any[]){
    let parent = null;

    let parentwbs = 0;
    let childwbs ="";
    let grandchildwbs = ""
    let taskwbs1 = 0;
    let taskwbs3=0;
    let taskwbs4 =0;

    const wbsArray:any[]  =[]
    const parentArray = [];
    const childArray= [];



    for (const item of variable){

      if(item.TASK1 !== undefined || item.TASK2 !== undefined || item.TASK3 !== undefined || item.TASK4 !== undefined){
        // console.log(item)
        const getdate = this.formdate(item.StartedOn)
        // console.log("this is the formatted date:")
        // console.log(getdate)
        item.StartedOn=getdate
        // console.log(item)


      }
    }


    for (const item of variable){

      if(item.TASK1 !== undefined || item.TASK2 !== undefined || item.TASK3 !== undefined || item.TASK4 !== undefined){
        // console.log(item)
        const getdate = this.formdate(item.CompletedOn)
        // console.log("this is the formatted date:")
        // console.log(getdate)
        item.CompletedOn=getdate
        // console.log(item)


      }
    }
    //==============
    for (const item of variable) {
      //FOR PARENT STRING
      if (item.TASK1 !== undefined){
                                                          console.log("item of the data")
                                                          console.log(item)
                                                          console.log("task of the above item")
                                                          console.log(item.TASK1)
        parentArray.push(item)
        parentwbs+=1
        item.wbs=parentwbs
        item.string=item.TASK1

        var wbs = item.wbs.toString(); // Convert wbs to string
        var id = wbs.charAt(wbs.length - 1); // Get the last character as id
        var refid = wbs.substring(0, wbs.length - 2); // Get remaining characters as refid

        item.refid=refid;
        wbsArray.push(item)
      }
      //===================
      //FOR CHILD OF PARENTS
      else if (item.TASK1 === undefined && item.TASK2 !== undefined){
        // let taskwbs1=0;
        taskwbs1+=1
        childwbs =parentwbs+"."+taskwbs1
        item.wbs=childwbs
        // console.log(item)
        childArray.push(item)
        item.string=item.TASK2
        var wbs = item.wbs.toString(); // Convert wbs to string
        var id = wbs.charAt(wbs.length - 1); // Get the last character as id
        var refid = wbs.substring(0, wbs.length - 2); // Get remaining characters as refid

        item.refid=refid;

        wbsArray.push(item)

      }
      //===================
      else if(item.TASK1 === undefined && item.TASK2 === undefined && item.TASK3 !== undefined){
        // let taskwbs3=0;
        taskwbs3+=1;
        grandchildwbs = childwbs+"."+taskwbs3
        item.wbs=grandchildwbs
        item.string=item.TASK3
        var wbs = item.wbs.toString(); // Convert wbs to string
        var id = wbs.charAt(wbs.length - 1); // Get the last character as id
        var refid = wbs.substring(0, wbs.length - 2); // Get remaining characters as refid

        item.refid=refid;

        // console.log(item)
        wbsArray.push(item)
      }

      else if (item.TASK1 === undefined && item.TASK2 === undefined && item.TASK3 === undefined && item.TASK4 !== undefined){

        taskwbs4+=1;
        item.wbs=grandchildwbs+"."+taskwbs4
        // console.log(item)
        item.string=item.TASK4
        var wbs = item.wbs.toString(); // Convert wbs to string
        var id = wbs.charAt(wbs.length - 1); // Get the last character as id
        var refid = wbs.substring(0, wbs.length - 2); // Get remaining characters as refid

        item.refid=refid;

        wbsArray.push(item)

      }

      // console.log("this is the parent data of this .........")
      // console.log(parentData)
    }

    console.log("parent data of the varibale......")
    console.log(parentArray)

  return wbsArray
  }


  //===============
  //TO SEND THE VARIABLE TO AN API ENDPOINT
  sendVariableToAPI(variable: any): void {
    console.log("this is the variable shared to api function:")
    console.log(variable);
    const apiUrl = 'http://localhost:4000/updates';

    this.http.post(apiUrl, variable).subscribe(
      response => {
        console.log('Variable sent successfully & this is the updated data:', response);
        // Handle the response from the API if needed
      },
      error => {
        console.error('Error sending variable:', error);
        // Handle the error if needed
      }
    );


    // Make an HTTP POST request to the API endpoint
    // this.http.post(apiUrl, variable).pipe(
    //   catchError(error=>{
    //     console.error('Error sending variable:', error);

    //     throw error;
    //   })
    // ).subscribe(response=>{
    //   console.log('Variable sent successfully:', response);
    // })


  };


// //   //===============
//   //TO GET THE DATA FROM THE API
//   getVariableFromAPI(): void {
//     const apiUrl = 'http://localhost:4000/updates';
//     // Make an HTTP GET request to fetch the data from the API

//     this.http.get<any>(apiUrl).subscribe({
//       next: (data:any[])=>{

//         console.log('Data received from API:', data);

//       }

//     });
// }




}


















/*
  convertDataToObjects(jsonData: any[]): void {
  if (jsonData.length > 1) {
    const headers = this.rowData[0]; //first row would be the headers
    this.rowData = jsonData;
    console.log(this.rowData);
    this.rowDataObject = this.rowData.slice(1).map((row: any, index: number) => {
      const rowDataObject: any = {};
      headers.forEach((header: any, index: number) => {
        rowDataObject[header] = row[index];
      });
      rowDataObject.index = index; // Add index property for parent-child relationship
      return rowDataObject;
    });
    console.log(this.rowDataObject);
    this.assignWBS('', '', this.rowDataObject); // Call the function to assign WBS
  }
}

  }







*/

  // formatDate(params: any): string {
  //   if (params.value) {
  //     const formattedDate = formatDate(params.value, 'yyyy-MM-dd', 'en-US');
  //     return formattedDate;
  //   }
  //   return '';
  // }

