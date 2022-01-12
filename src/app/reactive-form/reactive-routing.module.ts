import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormValidationsComponent } from './form-validations/form-validations.component';

const routes: Routes = [
  {
    path: 'form',
    component: FormValidationsComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveRoutingModule {

}
