import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from '../../shared/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.page.html',
  styleUrls: ['./edit-employee.page.scss'],
})
export class EditEmployeePage implements OnInit {
  id;
  selectedEmployee:Employee;
  subscription:Subscription;
  constructor(private employeeService: EmployeeService,private modalctrl:ModalController) { }
  form;


  ngOnInit() {
    console.log(this.id);
    this.selectedEmployee = this.employeeService.getEmployee(this.id);
    this.form = new FormGroup({
      name: new FormControl(this.selectedEmployee.name,Validators.required),
      designation: new FormControl(this.selectedEmployee.designation,Validators.required),
      email: new FormControl(this.selectedEmployee.email,[Validators.required,Validators.email]),
      mobile: new FormControl(this.selectedEmployee.mobile,[Validators.required,Validators.pattern('[0-9]{10}')]),
      imageURL: new FormControl(this.selectedEmployee.imageURL,[Validators.required])
    })
  }

  onSubmit(){
    console.log(this.form);
    this.selectedEmployee.name = this.form.value.name;
    this.selectedEmployee.email = this.form.value.email;
    this.selectedEmployee.mobile= this.form.value.mobile;
    this.selectedEmployee.designation = this.form.value.designation;
    this.selectedEmployee.imageURL = this.form.value.imageURL;
    this.employeeService.updateEmployee(this.selectedEmployee);
    this.onClose();
  }
  onClose(){
    this.modalctrl.dismiss();
  }

}
