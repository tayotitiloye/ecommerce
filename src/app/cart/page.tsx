"use client";
//import CartItemCard from "src/components/CartItemCard";
import React from "react";
import CartItemCard from "src/components/CartItemCard";
import { TotalPriceSelector } from "src/store/features/cartSlice";
import { useAppSelector } from "src/store/store";



const CartPage = () => {
  const cartItems = useAppSelector(
    (state) => state.cart.cartItems
  );

  const totalPrice = useAppSelector(TotalPriceSelector);
  
  return (
    <>
    <div className="p-2 mt-[100px] ">
                      {cartItems.map((item, index) => (
                        <CartItemCard key={index} cartItem={item} />
                      ))}

                      
    </div>

    <div className='flex items-center justify-end'>
              <div>
                  
                    <div className='border-2 p-4 m-8 w-[420px] rounded-lg '>
                      <div className='flex justify-between'>Subtotal : <span>$ { totalPrice.toFixed(2)}</span></div>
                        <div className='flex justify-between my-2 underline'>Shipping Fee  <span className="text-green-600 font-bold">(FREE)</span> : <span className=''>$ 0:00</span></div>
                      <div className='flex justify-between font-bold my-5 text-2xl'>Order Total : <span>$ { totalPrice.toFixed(2)}</span></div>
                    </div>
                    <div className='mx-8 w-[420px]'>
                        
                    <button className='text-white p-2 bg-yellow-700 rounded-md w-full'>login</button>
                    </div>
              </div>
      </div>
      </>
    
  );
};

export default CartPage;

  



  



// 'use client'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import { useCartEcommerce } from 'src/app/utilis/store'
// import { cartState } from 'src/atoms/cartState'
// import AddToCart from 'src/components/AddToCart'
// //import AddToCart from 'src/app/(foodcomponents)/AddToCart'
// //import {useRecoilState} from "recoil"

// const Cart = () => {


//     const { product, totalItems, totalPrice, removeFromCart } = useCartEcommerce()
//     //const [total, setTotal] = useState(0)
    
//   //  const [cartItem] = useRecoilState(cartState)
    

//     useEffect(() => {
//         useCartEcommerce.persist.rehydrate()
//     },[])
//     // function handleToatal() {
//     //     const grandTotal = shipping + totalPrice
//     //     setTotal(total.reduce((grandTotal, totalPrice) => {
//     //         grandTotal + totalPrice
//     //     },0))
//     // }
    

//   return (
//       <div>
          
//           <div className='bg-orange-100 px-4 text-yellow-800 my-8 md:px-6 md:text-4xl h-32 flex items-center justify-start text-2xl md:6xl font-bold '>
//                 <Link href='/'>
                    
//                     Home
//               </Link>
//               <span className=' text-yellow-800 px-4'>/ Cart</span>
              
//           </div>
//          {product.map(item=> (<div key={item.id} className='flex flex-row px-2 items-center justify-between my-4'>
//               <div>
//                   <img src={item.image} alt='image' className='h-36 w-36 rounded-md'/>
//               </div>
//               <div className='md:flex gap-4'>
//                  <h1 className='font-bold'>{ item.title}</h1>
//                     <p>${item.price}</p>
//            </div>
//            {/* <div><AddToCart product={item} /></div> */}
//               {/* quantity */}
//               {/* <div className='px-4'>
//                     <div className='flex gap-9 font-bold text-2xl py-2'>
//                         <span className='cursor-pointer' onClick={handleQtyDec}>-</span>
//                       <p>{ qty}</p>
//                         <span className='cursor-pointer' onClick={handleQtyInc}>+</span>
                        
//                     </div>
//                     <button className='text-white p-2 text-xl rounded-lg bg-yellow-800'>add to cart</button>
//               </div> */}
//               <div className='hidden md:block'>
//                   ${totalPrice.toFixed(2)}
//               </div>
//               <div className='font-bold text-xl'>{ totalItems}</div>
//               <button onClick={()=>removeFromCart(item)} className='bg-red-700 rounded-sm text-white'>remove</button>
//           </div>
//          ))}
          
//       {/* recoil test */}
//       <br /><hr />

//          {/* {cartItem.map(item=> (<div key={item.id} className='flex flex-row px-2 items-center justify-between my-4'>
//               <div>
//                   <img src={item.image} alt='image' className='h-36 w-36 rounded-md'/>
//               </div>
//               <div className='md:flex gap-4'>
//                  <h1 className='font-bold'>{ item.title}</h1>
//                     <p>${item.price}</p>
//               </div> */}
//               {/* quantity */}
//               {/* <div className='px-4'>
//                     <div className='flex gap-9 font-bold text-2xl py-2'>
//                         <span className='cursor-pointer' onClick={handleQtyDec}>-</span>
//                       <p>{ qty}</p>
//                         <span className='cursor-pointer' onClick={handleQtyInc}>+</span>
                        
//                     </div>
//                     <button className='text-white p-2 text-xl rounded-lg bg-yellow-800'>add to cart</button>
//               </div> */}
//               {/* <div className='hidden md:block'>
//                   ${totalPrice.toFixed(2)}
//            </div>
//            <div>{ cartItem.quantity}</div>
//               <div className='font-bold text-xl'>{ totalItems}</div>
//               <button onClick={()=>removeFromCart(item)} className='bg-red-700 rounded-sm text-white'>remove</button>
//           </div>
//          ))} */}

//       <hr /><br />
//             {/* buttons */}

//           <div className='flex items-center justify-between px-4 my-10'>
//               <Link href='/product'>
                  
//               <button className='text-white p-2 bg-yellow-700 rounded-md'>Continue Shopping</button>
//             </Link>
            
//               <button className='text-white p-2 bg-black rounded-md'>Clear Shopping Cart</button>
//           </div>
//           <div className='flex items-center justify-end'>
//               <div>
                  
//                     <div className='border-2 p-4 m-8 w-[420px] rounded-lg '>
//                       <div className='flex justify-between'>Subtotal : <span>$ { totalPrice.toFixed(2)}</span></div>
//                         <div className='flex justify-between my-2 underline'>Shipping Fee : <span className='text-green-500 text-xl'>$ FREE</span></div>
//                       <div className='flex justify-between font-bold my-5 text-2xl'>Order Total : <span>{ totalItems}</span> <span>$ { totalPrice.toFixed(2)}</span></div>
//                     </div>
//                     <div className='mx-8 w-[420px]'>
                        
//                     <button className='text-white p-2 bg-yellow-700 rounded-md w-full'>login</button>
//                     </div>
//               </div>
//           </div>
//       {/* <h1 className='font-bold text-3xl text-red-600'>recoil fig:{ cartItem.length}</h1>         */}

//     </div>
//   )
// }



// export default Cart

