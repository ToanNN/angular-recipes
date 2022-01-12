import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'validations',
    loadChildren: () => import('./reactive-form/reactive-form-module/app-reactive-form.module').then(m => m.AppReactiveFormModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
