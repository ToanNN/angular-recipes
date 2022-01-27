import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ProductCategory } from 'src/app/product-categories/product-category';
import { ProductCategoryService } from 'src/app/product-categories/product-category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  imageWidth = 50;
  imageMargin = 2;


  _filterText: string;
  errorMessage: string;
  get filterText() {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;

  }
  products$: Observable<Product[]> | undefined;
  categories$: Observable<ProductCategory[]> | undefined;
  private selectedCategorySubject = new BehaviorSubject(0);
  selectedCategoryActions = this.selectedCategorySubject.asObservable();

  constructor(private productService: ProductService, private categoryService: ProductCategoryService) {
    this.errorMessage = '';
    this._filterText = '';
  }

  ngOnInit(): void {


    let category$ = this.categoryService.getCategories();
    this.categories$ = category$.pipe(catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    }))

    this.products$ = combineLatest([this.productService.productWithCategory$,
    this.selectedCategoryActions])
      .pipe(map(([products, categoryId]) => products.filter(pr => categoryId ? pr.categoryId == categoryId : true))
        , catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        }))
  }

  onCategorySelected(selectedElement: EventTarget | null): void {
    const inputElement = selectedElement as HTMLInputElement;

    if (inputElement && inputElement.value) {
      this.selectedCategorySubject.next(+inputElement.value);
    }

  }

}
