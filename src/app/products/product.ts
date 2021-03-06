/* Defines the product entity */
export interface Product {
  id: number;
  productName: string;
  categoryId?: number;
  quantityInStock?: number;
  searchKey?: string[];
  supplierIds?: number[];
  productCode: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
  category?: string;
}

export interface ResolvedProduct {
  product: Product | null;
  error?: string;

}

