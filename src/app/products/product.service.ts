import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl: string = 'api/products';
  getProduct(productId: number): Observable<Product> {
    if (productId === 0) {
      return of({} as Product);
    }
    const url = `${this.productUrl}/${productId}}`;

    return this.http.get<Product>(url)
      .pipe(catchError(this.handleError));
  }


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
      .pipe(retry(3),
        catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred:', error.error;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Backend returned code ${error.status}, body was:  ${error.error}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }
}
