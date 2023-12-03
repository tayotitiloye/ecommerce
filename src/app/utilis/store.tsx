import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
//import { ProductType } from "../(ecommerce)/eproduct/page"

type ProductType = {
      id: number
      image: string
      price: number
      title: string
     category?: string
     description?: string
     quantity:number
      
    }


type CartType = {
    product: ProductType[]
    totalItems: number
    totalPrice: number

}
 type ActionType = {
     addToCart:(item:ProductType)=> void
     removeFromCart:(item:ProductType)=> void
    // removeFromCart:(item:CartType)=> void
}

// export type CartItemType = {
//   id: string;
//   title: string;
//   img?: string;
//   price: number;
//   optionTitle?: string;
//   quantity: number;
// };

// export type CartType = {
//   products: CartItemType[];
//   totalItems: number;
//   totalPrice: number;
// };

// export type ActionTypes = {
//   addToCart:(item:CartItemType)=> void;
//   removeFromCart:(item:CartItemType)=> void;
// }

const INITIAL_STATE = {
    product: [],
    totalItems: 0,
    totalPrice:0,

}



export const useCartEcommerce = create(persist<CartType & ActionType>((set, get) => (
    {
    product: INITIAL_STATE.product,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    
    
        addToCart(item) {

            
            const product = get().product
            const productINState = product.find(pdt=> pdt.id ===item.id)

            if (productINState) {

                const updatedProduct = product.map(pdt => (
                    pdt.id === productINState.id
                        ? {
                            ...item,
                            quantity: item.quantity + pdt.quantity,
                            price: item.price + pdt.price
                        } : item
                ))
                set((state) => ({
                    
                    product: updatedProduct,
                    totalItems: state.totalItems + item.quantity,
                    totalPrice: state.totalPrice + item.price,
                    }))           
                        
            } else {
                
                set((state) => ({
                    product: [...state.product, item],
                    totalItems: state.totalItems + item.quantity,
                    totalPrice: state.totalPrice + item.price,
                }))
            }
        },
    
        // addToCart(item) {
        //     set((state) => ({
        //         product: [...state.product, item],
        //         totalItems: state.totalItems + item.quantity,
        //         totalPrice: state.totalPrice + item.price
        //     }))
        // },
        

        removeFromCart(item) {
            set((state) => ({
                product: state.product.filter((pdt) => pdt.id !== item.id),
                totalItems: state.totalItems - item.quantity,
                totalPrice: state.totalPrice - item.price,
            }))
        }
        
        // addToCart(item) {
        //     set((state) => ({
        //          product: [...state.product, item],
        //          totalItems: state.totalItems + item.quantity,
        //         totalPrice: state.totalPrice + item.price
        
        //     })),
                
        // },
        // removeFromCart(item) {
        //     set((state) => ({
        //         product: state.product.filter(product=>product.id !== item.id),
        //         totalItems: state.totalItems - item.quantity,
        //         totalPrice: state.totalPrice - item.price
        //     }))
        // }
    }
), {name: 'cart', storage: createJSONStorage(() => sessionStorage), skipHydration: true}))








// import { ActionTypes, CartType } from "@/types/types";
// import { persist } from "zustand/middleware";

// const INITIAL_STATE = {
//   products: [],
//   totalItems: 0,
//   totalPrice: 0,
// };

// export const useCartStore = create(
//   persist<CartType & ActionTypes>(
//     (set, get) => ({
//       products: INITIAL_STATE.products,
//       totalItems: INITIAL_STATE.totalItems,
//       totalPrice: INITIAL_STATE.totalPrice,
//       addToCart(item) {
//         const products = get().products;
//         const productInState = products.find(
//           (product) => product.id === item.id
//         );

//         if (productInState) {
//           const updatedProducts = products.map((product) =>
//             product.id === productInState.id
//               ? {
//                   ...item,
//                   quantity: item.quantity + product.quantity,
//                   price: item.price + product.price,
//                 }
//               : item
//           );
//           set((state) => ({
//             products: updatedProducts,
//             totalItems: state.totalItems + item.quantity,
//             totalPrice: state.totalPrice + item.price,
//           }));
//         } else {
//           set((state) => ({
//             products: [...state.products, item],
//             totalItems: state.totalItems + item.quantity,
//             totalPrice: state.totalPrice + item.price,
//           }));
//         }
//       },
//       removeFromCart(item) {
//         set((state) => ({
//           products: state.products.filter((product) => product.id !== item.id),
//           totalItems: state.totalItems - item.quantity,
//           totalPrice: state.totalPrice - item.price,
//         }));
//       },
//     }),
//     { name: "cart", skipHydration: true }
//   )
// );
 