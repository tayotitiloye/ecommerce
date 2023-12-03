"use client"

import { useState } from "react"
import { TotalPriceSelector } from "src/store/features/cartSlice";
import { useAppSelector } from "src/store/store";

interface Order{
    firstName: string;
    address: string
}

const CheckoutPage = () => {

    const [details, setDetails] = useState<Order>({ firstName: '', address: '' })

    const cartItems = useAppSelector(
            (state) => state.cart.cartItems
        );

      const totalPrice = useAppSelector(TotalPriceSelector);



    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        setDetails(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }


//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const url = await upload();
//       const res = await fetch("http://localhost:3000/api/products", {
//         method: "POST",
//         body: JSON.stringify({
//           img: url,
//           ...inputs,
//           options,
//         }),
//       });

//       const data = await res.json();

//       router.push(`/product/${data.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   };

    // try {
    //     const res = await fetch("http://localhost:3000/api/orders", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         price: totalPrice,
    //         products,
    //         status: "Not Paid!",
    //         userEmail: session.user.email,
    //       }),
    //     });
    //     const data =await res.json()
    //     router.push(`/pay/${data.id}`)
    //   } catch (err) {
    //     console.log(err);
    //   }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const res = await fetch("http://localhost:3000/api/order", {
                method: 'POST',
                body: JSON.stringify({
                    name: details.firstName,
                    address: details.address,
                    products: cartItems,
                    price: totalPrice

                })
            })

            const data = await res.json()
           // return await res.json()
            
        } catch (error) {
            console.log(error)
        }

    }

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const url = await upload();
//       const res = await fetch("http://localhost:3000/api/products", {
//         method: "POST",
//         body: JSON.stringify({
//           img: url,
//           ...inputs,
//           options,
//         }),
//       });

//       const data = await res.json();

//       router.push(`/product/${data.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   };


 
    return (
        <div className='p-8'>
          <h1 className='font-medium text-3xl pb-4 border-b-2 mt-10'>Place Your Order</h1>
          <div className=' flex flex-col gap-8 md:flex-row'>
              <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:flex-1'>
                  <h2 className='font-medium text-2xl mt-8'>Shipping Information</h2>
            
                  <label htmlFor="">First name</label>
                  <input type="text" required className='border ring-1 p-3 rounded-md' name="firstName" placeholder="firtName" onChange={handleChange}/>
                  <label htmlFor="">Address</label>
                  <input className='border ring-1 p-3 rounded-md' required type="text"  name="address" placeholder="address" onChange={handleChange}/>
                  <button className='text-white uppercase text-lg rounded-md bg-blue-500 p-4 w-full'>place your order</button>
              </form>
             <div className='flex flex-col items-center md:flex-1 justify-center w-[85vw] md:w-[90vw] lg:w-[20vw]'>
                  <div className='bg-blue-50 rounded-lg p-6 w-full'>
                      
                        <div>
                            <p className='flex border-b-2 p-2 items-center justify-between'>Subtotal <span className='font-bold'>$ {totalPrice.toFixed(2) }</span></p>
                        </div>
                        <div>
                            <p className='flex border-b-2 p-2 items-center justify-between'>Shipping: FREE <span className='font-bold'>$0.00</span></p>
                        </div>
                        {/* <div>
                            <p className='flex border-b-2 p-2 items-center justify-between'>Tax<span className='font-bold'>$123</span></p>
                        </div> */}
                        <div>
                            <p className='flex  p-2 items-center justify-between'>Order Total <span className='font-bold'>${ totalPrice.toFixed(2)}</span></p>
                        </div>
                    </div>
                    
                        {/* <button className='text-white p-4 bg-blue-600  w-full rounded-md'>proceed to checkout</button> */}
              </div>

          </div>
    </div>
  )
}

export default CheckoutPage