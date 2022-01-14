import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValidationsComponent } from '../form-validations/form-validations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { ReactiveRoutingModule } from '../reactive-routing.module';

@NgModule({
  declarations: [
    FormValidationsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveRoutingModule
  ]
})
export class AppReactiveFormModule { }
