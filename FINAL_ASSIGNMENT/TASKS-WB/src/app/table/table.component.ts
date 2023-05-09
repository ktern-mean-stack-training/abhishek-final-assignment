import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  gridOptions = {
    columnDefs: [
      { field: 'Task1', minWidth: 180 },
      { field: 'Task2' },
      { field: 'Task3', minWidth: 150 },
      { field: 'StartedOn' },
      { field: 'CompletedOn', minWidth: 130 },
      { field: 'weightage', minWidth: 100 },
      { field: 'milestone' },
    ],

    defaultColDef: {
      resizable: true,
      minWidth: 80,
      flex: 1,
    },
    rowData: [],
};



  }




  /*

      if (jsonData.length > 0) {
      this.columnDefs= Object.keys(jsonData[0]).map((header: any) => ({
        headerName: header,
        field: header
      }));

      console.log(this.columnDefs)

    }

    if (jsonData.length > 1) {
      this.rowData = jsonData
      console.log(jsonData)
    }
  };

  reader.readAsArrayBuffer(file);
}
formatDate(value: any): any {
  if (typeof value === 'number') {
    // Convert Excel date value to JavaScript Date object
    const excelDate = value;
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const dateOffset = (excelDate - 25569) * millisecondsPerDay;
    const date = new Date(dateOffset);

    // Format the date as 'MM/DD/YYYY'
    const formattedDate = (date.getMonth() + 1).toString().padStart(2, '0') +
      '/' + date.getDate().toString().padStart(2, '0') +
      '/' + date.getFullYear();

    return formattedDate;
    console.log(formattedDate)
  }

  return value;
}

*/
