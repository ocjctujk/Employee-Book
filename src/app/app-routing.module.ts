import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'add-employee',
    loadChildren: () => import('./employee/add-employee/add-employee.module').then( m => m.AddEmployeePageModule)
  },
  {
    path: 'edit-employee',
    loadChildren: () => import('./employee/edit-employee/edit-employee.module').then( m => m.EditEmployeePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
