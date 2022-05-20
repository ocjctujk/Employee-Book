import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private modalctrl: ModalController
  ) {}
  form;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      designation: new FormControl(
        '',
        Validators.required
      ),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      imageURL: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    console.log(this.form);
    const employee:Employee = {
      id: Math.random(),
      name: this.form.value.name,
      email : this.form.value.email,
      mobile : this.form.value.mobile,
      designation : this.form.value.designation,
      imageURL : this.form.value.imageURL
    }
    this.employeeService.addEmployee(employee);
    this.onClose();
  }
  onClose() {
    this.modalctrl.dismiss();
  }
}
