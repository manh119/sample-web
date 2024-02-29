import { Injectable, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { EmployeeDTO } from './EmployeeDTO';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})

export class ExportService{
  constructor() {}
  exportEmployees(data: EmployeeDTO[]): void{
        
    // Implement your export logic here
    console.log('Exporting data:',data);

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('ListEmployeesSheet');

    worksheet.columns = [
      { header: 'STT', key: 'stt', width: 10  },
      { header: 'Name', key: 'name', width: 22 },
      { header: 'Email', key: 'email', width: 32 },
      { header: 'Age', key: 'age', width: 5 },
      {
        header: 'Salary',
        key: 'salary',
        width: 10,
      },
      { header: 'Department', key: 'department', width: 15 },

    ];

    data.forEach((e, index) => {
      worksheet.addRow(
        {
          stt : (index + 1).toString(),
          name: e.name,
          email: e.email,
          age: e.age,
          salary: e.salary,
          department : e.department,

        },
        'n'
      );
    });
    
    console.log("worksheet ", worksheet);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'ProductData.xlsx');
    });
  }
}
