import { Component, OnInit } from '@angular/core';
import { EmployeeDTO } from '../EmployeeDTO'
import { EmployeeService } from '../employee.service'
import { Router } from '@angular/router';
import {Page} from '../Page';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import {ExportService} from '../export.service'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  departments = [
    {value: 'all', viewValue: 'ALL'},
    {value: 'IT', viewValue: 'IT'},
    {value: 'Engineer', viewValue: 'Engineer'},
    {value: 'Sales', viewValue: 'Sales'},
    {value: 'Human Resource', viewValue: 'Human Resource'},
    {value: 'Marketing', viewValue: 'Marketing'},
    {value: 'Finance', viewValue: 'Finance'},

  ];

  selectedDepartment: string = 'all'; 

  // TODO :
  updateByDepartment(): void {
    console.log('Selected Department Changed to:', this.selectedDepartment);
    this.searchResults();
        if (this.selectedDepartment === 'all') {
      return;
    }
    
    this.employees = this.employees.filter(employee => employee.department.toString() === this.selectedDepartment);
  }

  
  employees: EmployeeDTO[];
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    public dialog: MatDialog,
    private exportService: ExportService) { 
      this.getEmployees();
    }

  ngOnInit(): void {
  }

  openConfirmationDialog(employeeId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEmployee(employeeId);
      }
    });
  }

  private getEmployees(){
    this.employeeService.getEmployeesPage(0, this.pageSize).subscribe(
      (data : Page<EmployeeDTO>) => {
      console.log("employees : ", data);
      this.employees = data.content;
    });
  }

  private getAll() {
    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        console.log("employees: ", data);
        // Assign the array directly
        this.employees = data;
      },
      (error) => {
        console.error("Error fetching employees:", error);
      }
    );
  }
  
  
  

  searchText = '';

  searchResults() {
    console.log("searchText = ", this.searchText);
    if (!this.searchText) {
      this.getEmployees();
      return;
    }
  
    this.employeeService.getEmployeesByName(this.searchText, 0, this.pageSize).subscribe(
      (data: Page<EmployeeDTO>) => {
        console.log("search results : ", data);
        this.employees = data.content || []; // Use empty array if data.content is falsy
      },
      error => {
        console.error("Error fetching search results:", error);
        this.employees = []; // Set to empty array on error
      }
    );
  }
  

  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(employeeId: number): void {
    console.log(`Deleting employee with ID: ${employeeId}`);
    this.employeeService.deleteEmployee(employeeId).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })
    
  }

  // HANDLE PAGE
  totalItems = 200; 
  pageSize = 10; 
  pageSizeOptions = [10, 20, 50]; 

  onPageChange(event: any): void {
    console.log('Page event:', event);
    this.pageSize = event.pageSize;
    this.searchResults();
  }

  // EXPORT 
  exportData(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        console.log("data ", data);
        this.employees = data;
        console.log("employees : ", this.employees);
        this.exportService.exportEmployees(this.employees);
      }
    );
  }
  
  

  // SORT
  sortField: string = ''; 
  sortOrder: string = 'asc'; 
  setSorting(field: string): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.sortData();
  }

  sortData(): void {
    if (this.sortField && this.sortOrder) {
      this.employees.sort((a, b) => {
        const valueA = a[this.sortField];
        const valueB = b[this.sortField];
  
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return this.sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        } else {
          return 0;
        }
      });
    }
  } 
  
}
