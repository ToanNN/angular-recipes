import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { ProductData } from "./product-data";
import { SupplierData } from "./supplier-data";

export class InMemoryAppData implements InMemoryDbService {
  createDb() {
    const products = ProductData.products;
    const suppliers = SupplierData.suppliers;

    return { products, suppliers };
  }
}
