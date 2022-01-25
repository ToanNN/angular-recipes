import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  supplierUrl = 'api/suppliers';

  constructor(private http: HttpClient) { }
}
