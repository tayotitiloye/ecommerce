// export interface Product {
//   id: number;
//   name: string;
//   price: number;
//   imagePath: string;
// }

export interface CartItem {
  product: Product;
  qty: number;
}

export type Product = { id: number
      image: string
      price: number
      title: string
     category?: string
    description: string
       
}

