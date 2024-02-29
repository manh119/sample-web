import { Component, OnInit } from '@angular/core';
import { EmployeeDetailsDTO } from '../EmployeeDetailsDTO';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id: number
  employee: EmployeeDetailsDTO;
  constructor(private route: ActivatedRoute, private employeService: EmployeeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeService.getEmployeeDetailsDTO(this.id).subscribe(data => {
      this.employee = data;
    })
    
  }

}
