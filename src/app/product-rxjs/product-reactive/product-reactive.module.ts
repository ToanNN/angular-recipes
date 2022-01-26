import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ProductReactiveModule { }
