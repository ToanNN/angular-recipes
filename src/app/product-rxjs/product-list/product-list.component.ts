import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { ProductCategoryService } from 'src/app/product-categories/product-category.service';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  pageTitle = 'Product List';
  products$: Observable<Product[]> | undefined;
  errorMessage: string = '';
  constructor(private productService: ProductService, private categoryService: ProductCategoryService) { }

  ngOnInit(): void {

    let product$ = this.productService.getProducts();
    let category$ = this.categoryService.getCategories();

    this.products$ = combineLatest([product$, category$])
      .pipe(
        map(([products, categories]) => products.map(pr => ({
          ...pr,
          price: pr.price * 1.5,
          category: categories.find(c => pr.categoryId === c.id)?.name,
          searchKey: [pr.productName]
        }) as Product)),
        tap(data => console.log('Products: ', JSON.stringify(data))),
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        }));
  }

}
