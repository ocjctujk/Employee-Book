import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddEmployeePage } from '../employee/add-employee/add-employee.page';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {
  searchValue='';
  filteredEmployees:Employee[];
  employees:Employee[];
  subscription:Subscription;
  constructor(private employeeService:EmployeeService,private modalCtrl:ModalController) {}

  ngOnInit(): void {
    this.subscription = this.employeeService.employeeSubject.subscribe(employees=>{
      this.employees = [...employees];
      this.filteredEmployees = [...employees];
      this.onChange(this.searchValue);
    })
    this.employeeService.fetchData();
  }

  onAdd(){
    this.modalCtrl.create({
      component: AddEmployeePage
    }).then(modal=>{
      modal.present();
    })
  }

  onChange(value){
    value = value.toLowerCase();
    if(value.length<1){
      this.filteredEmployees = [...this.employees];
      return;
    }
    this.searchValue = value;
    this.filteredEmployees = [...this.employees.filter(employee=>{
      return employee.name.toLowerCase().includes(value);
    })];

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
