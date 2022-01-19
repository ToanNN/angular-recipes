import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = "Product Detail";
  errorMessage = '';
  product: Product | undefined;


  constructor(private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    const idParameter = this.route.snapshot.paramMap.get("id");
    if (idParameter) {
      const id = +idParameter;
      this.getProduct(id);
    }

  }
  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: prod => this.product = prod,
      error: err => this.errorMessage = err
    });
  }

}
