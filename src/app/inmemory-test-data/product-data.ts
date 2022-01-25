import { Product } from "../products/product";

export class ProductData {
  static products: Product[] = [
    {
      id: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      releaseDate: 'March 19, 2018',
      description: 'Leaf rake with 48-inch wooden handle',
      price: 19.95,
      starRating: 3.2,
      imageUrl: 'assets/images/leaf_rake.png',
      tags: ['rake', 'leaf', 'yard', 'home'],
      categoryId: 1,
      quantityInStock: 15,
      supplierIds: [1, 2]
    },
    {
      id: 2,
      productName: 'Garden Cart',
      productCode: 'GDN-0023',
      releaseDate: 'March 18, 2018',
      description: '15 gallon capacity rolling garden cart',
      price: 32.99,
      starRating: 4.2,
      imageUrl: 'assets/images/garden_cart.png',
      categoryId: 1,
      quantityInStock: 2,
      supplierIds: [3, 4]
    },
    {
      id: 5,
      productName: 'Hammer',
      productCode: 'TBX-0048',
      releaseDate: 'May 21, 2018',
      description: 'Curved claw steel hammer',
      price: 8.9,
      starRating: 4.8,
      imageUrl: 'assets/images/hammer.png',
      categoryId: 3,
      quantityInStock: 8,
      supplierIds: [5, 6],
      tags: ['tools', 'hammer', 'construction']
    },
    {
      id: 8,
      productName: 'Saw',
      productCode: 'TBX-0022',
      releaseDate: 'May 15, 2018',
      description: '15-inch steel blade hand saw',
      price: 11.55,
      starRating: 3.7,
      imageUrl: 'assets/images/saw.png',
      categoryId: 3,
      quantityInStock: 6,
      supplierIds: [7, 8]
    },
    {
      id: 10,
      productName: 'Video Game Controller',
      productCode: 'GMG-0042',
      releaseDate: 'October 15, 2018',
      description: 'Standard two-button video game controller',
      price: 35.95,
      starRating: 4.6,
      imageUrl: 'assets/images/xbox-controller.png',
      categoryId: 5,
      quantityInStock: 12,
      supplierIds: [9, 10]
    }
  ];


  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(hero => hero.id)) + 1 : 11;
  }
}
