import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Subscription } from 'rxjs';
import { NumberValidators } from 'src/app/shared/NumberValidators';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product | undefined;
  errorMessage: string;
  pageTitle: string;
  productForm: FormGroup;

  private subscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder) {
    this.errorMessage = '';
    this.pageTitle = "Edit";
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.maxLength(10)]],
      rating: ['', NumberValidators.range(1, 5)],
      tags: this.formBuilder.array([]),
      description: ''
    });

  }

  ngOnInit(): void {

    this.subscription = this.activatedRoute.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString) {
        const id = +idString;
        this.getProduct(id)
      }

    })
  }

  getProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe({
        next: (pro: Product) => this.displayProduct(pro),
        error: err => this.errorMessage = err
      })
  }
  displayProduct(pro: Product): void {
    if (this.productForm) {
      this.productForm.reset();
    }

    this.product = pro;
    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    this.productForm.patchValue({
      name: this.product.productName,
      code: this.product.productCode,
      rating: this.product.starRating,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.formBuilder.array(this.product.tags || []));
  }

  saveProduct() {

  }

}
