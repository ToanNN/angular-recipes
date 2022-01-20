import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.errorMessage = '';
    this.pageTitle = "Edit";
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
      productCode: ['', [Validators.required, Validators.maxLength(10)]],
      starRating: ['', NumberValidators.range(1, 5)],
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
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    });
    this.productForm.setControl('tags', this.formBuilder.array(this.product.tags || []));
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteProduct() {
    if (this.product && confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.product.id).subscribe({
        next: () => this.returnToProductList(),
        error: err => this.errorMessage = err
      });
    }
  }

  returnToProductList(): void {
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };
        if (p.id == 0) {
          this.productService.createProduct(p)
            .subscribe({
              next: () => this.returnToProductList(),
              error: err => this.errorMessage = err
            });
        } else {
          this.productService.updateProduct(p)
            .subscribe({
              next: () => this.returnToProductList(),
              error: err => this.errorMessage = err
            });

        }

      } else {
        this.returnToProductList();
      }
    } else {
      this.errorMessage = "Please correct validation errors";
    }
  }

}
