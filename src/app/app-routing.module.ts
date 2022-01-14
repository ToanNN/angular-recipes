import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'validations',
    loadChildren: () => import('./reactive-form/reactive-form-module/app-reactive-form.module').then(m => m.AppReactiveFormModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
