import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { ProductCategoryData } from "./product-category-data";
import { ProductData } from "./product-data";
import { SupplierData } from "./supplier-data";

export class InMemoryAppData implements InMemoryDbService {
  createDb() {
    const products = ProductData.products;
    const suppliers = SupplierData.suppliers;
    const productCategories = ProductCategoryData.categories;

    return { products, suppliers, productCategories };
  }
}
