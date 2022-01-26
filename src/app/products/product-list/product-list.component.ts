import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
  filteredProducts: Product[]

  _filterText: string;
  errorMessage: string;
  get filterText() {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;
    this.getProducts(this._filterText);
  }

  constructor(private prodService: ProductService) {
    this.filteredProducts = [];
    this._filterText = '';
    this.errorMessage = '';
  }

  getProducts(filterText: string): void {
    this.prodService.getProducts().subscribe({
      next: prods => {
        this.filteredProducts = prods.filter((product: Product) =>
          product.productName.toLocaleLowerCase().indexOf(filterText) !== -1);
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnInit(): void {
    this.getProducts('');
  }

}
