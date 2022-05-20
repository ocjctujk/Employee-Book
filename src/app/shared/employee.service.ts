import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _employees: Employee[] = [];
  employeeSubject = new BehaviorSubject<Employee[]>(this._employees);
  constructor(private http: HttpClient) {}

  // Fetching the Data

  fetchData() {
    this.http.get<Employee[]>('http://localhost:3000/employees').subscribe(
      (data) => {
        this._employees = [...data];
        this.employeeSubject.next(this._employees);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEmployee(id: number): Employee {
    return [
      ...this._employees.filter((employee) => {
        return employee.id === id;
      }),
    ][0];
  }

   // UPDATE EMPLOYEE

   updateEmployee(employee: Employee){
    let oldEmployee = this._employees.filter(employeeData=>{
      return employeeData.id===employee.id
    })[0];
    oldEmployee = {
      ...employee
    }
    this.employeeSubject.next(this._employees);
    console.log(this._employees);
    this.http.put('http://localhost:3000/employees/'+employee.id,oldEmployee).subscribe(
      success=>{console.log(success)},
      error=>console.log(error)
    )
  }



  // ADD EMPLOYEE

  addEmployee(employee: Employee){
    this._employees.push(employee);
    this.employeeSubject.next(this._employees);
    this.http.post('http://localhost:3000/employees',employee).subscribe(
      success=>console.log(success),
      error=>console.log(error)
    )
  }


  // DELETE EMPLOYEE

  deleteEmployee(id: number) {
   this.deleteEmployeeOnServer(id).subscribe(
    (success) => {
      console.log(success);
      this.deleteEmployeeLocally(id);
    },
    (error) => {
      console.log(error);
    }
  );
  }
  private deleteEmployeeLocally(id: number){
    this._employees = this._employees.filter(employee=>{
      return employee.id!=id;
    });
    this.employeeSubject.next(this._employees);
  }
  private deleteEmployeeOnServer(id: number){
    return this.http
    .delete('http://localhost:3000/employees/'+id);

  }
}
