export interface ProductsResponse {
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  calorie: number;
  slug: string;
}
