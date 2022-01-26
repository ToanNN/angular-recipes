import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle = 'Product List';
  products$: Observable<Product[]> | undefined;
  errorMessage: string = '';
  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.products$ = this.productService.getProducts()
      .pipe(catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      }));
  }

}
