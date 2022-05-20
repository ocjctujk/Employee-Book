import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { EditEmployeePage } from './edit-employee/edit-employee.page';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  @Input('id') id;

  employee: Employee;
  constructor(
    private employeeService: EmployeeService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.employee = this.employeeService.getEmployee(this.id);
  }
  onDelete() {
    this.alertCtrl
      .create({
        header: 'Are you aure you want to delete employee from system?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.employeeService.deleteEmployee(this.id);
            },
          },
          {
            text: 'No',
            role: 'cancel',
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  onEdit() {
    this.modalCtrl.create({
      component: EditEmployeePage,
      componentProps: {
        id: this.id
      }
    }).then(modal=>{
      modal.present();
    })
  }






}
