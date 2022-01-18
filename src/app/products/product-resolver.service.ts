import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, mergeMap, Observable, of, take } from 'rxjs';
import { Product, ResolvedProduct } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ResolvedProduct> {

  constructor(private service: ProductService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedProduct> {
    const id = route.paramMap.get('id');

    if (id == null || id === undefined || isNaN(+id)) {
      const message = `Product id ${id} is not a number`;
      console.error(message);
      return of({ product: null, error: message });
    }

    return this.service.getProduct(+id)
      .pipe(map(prod => {
        return { product: prod } as ResolvedProduct
      }),
        catchError(err => {
          const message = `Retrieval error ${err}`;
          console.error(message);
          return of({ product: null, error: message } as ResolvedProduct);
        }))

  }
}
