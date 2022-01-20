import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, tap, throwError } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  updateProduct(p: Product): Observable<Product> {
    const productUrl = `${this.productUrl}/${p.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Product>(productUrl, p, { headers })
      .pipe(tap(() => console.log("Update product: " + p.id)),
        // return the product after update
        map(() => p),
        catchError(this.handleError));
  }

  createProduct(p: Product): Observable<Product> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Product>(this.productUrl, p, { headers })
      .pipe(tap(data => console.log("Create product: " + JSON.stringify(data))),
        catchError(this.handleError));

  }
  deleteProduct(id: number): Observable<{}> {
    const productUrl = `${this.productUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(productUrl, { headers }).pipe(
      tap(data => console.log("Delete product " + id)),
      catchError(this.handleError)
    );
  }
  private productUrl: string = 'api/products';
  getProduct(productId: number): Observable<Product> {
    if (productId === 0) {
      return of({} as Product);
    }
    const url = `${this.productUrl}/${productId}`;

    return this.http.get<Product>(url)
      .pipe(tap((pr: Product) => console.log(pr)),
        catchError(this.handleError));
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
