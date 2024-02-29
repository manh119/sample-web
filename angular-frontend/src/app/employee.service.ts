import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { EmployeeDTO } from './EmployeeDTO';
import { Page } from './Page';
import { EmployeeDetailsDTO } from './EmployeeDetailsDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8081/api/v1/employees";

  constructor(private httpClient: HttpClient) { }
  
  getEmployeesPage(page: number, size : number): Observable<Page<EmployeeDTO>>{
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
    return this.httpClient.get<Page<EmployeeDTO>>(`${this.baseURL}/find_page`, {params});
  }

  getAllEmployees(): Observable<EmployeeDTO[]>{
    return this.httpClient.get<EmployeeDTO[]>(`${this.baseURL}/getAll`);
  }

  

  getEmployeesByName(name: string, page: number, size: number): Observable<Page<EmployeeDTO>> {
    const params = new HttpParams()
      .set('name', name)
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.httpClient.get<Page<EmployeeDTO>>(`${this.baseURL}/find_by_name`, { params });
  }

  createEmployee(employee: EmployeeDTO): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeDetailsDTO(id: number): Observable<EmployeeDetailsDTO>{
    return this.httpClient.get<EmployeeDetailsDTO>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: number, employee: EmployeeDTO): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
