import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductService } from './product.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductResolverService } from './product-resolver.service';
import { ProductEditGuard } from './product-edit.guard';
import { ProductEditInfoComponent } from './product-edit-info/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags/product-edit-tags.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryAppData } from '../inmemory-test-data/app-data';




@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryAppData),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: ProductListComponent
        },
        {
          path: ':id',
          component: ProductDetailComponent,
          resolve: { resolvedData: ProductResolverService }
        },
        {
          path: ':id/edit',
          component: ProductEditComponent,
          canDeactivate: [ProductEditGuard],
          resolve: { product: ProductResolverService },
          children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: 'info', component: ProductEditInfoComponent },
            { path: 'tags', component: ProductEditTagsComponent }
          ]
        }
      ]
    )
  ],
  providers: [ProductService]
})
export class ProductsModule { }
