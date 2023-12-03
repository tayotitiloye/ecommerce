
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddToCartBtn from 'src/components/AddToCartBtn'
import SingleCartCont from 'src/components/SingleCartCont'
// import AddToCart from 'src/components/AddToCart'
// import AddToCartBtn from 'src/components/AddToCartBtn'

export type Product = {
  id: number
      image: string
      price: number
      title: string
     category?: string
    description: string
     quantity:   number
       
}

interface Props {
  onIncrease: () => void;
  onDecrease: () => void;
  qty: number;
}
    
async function getData(id:number) {
  const res = await fetch(`http://localhost:3000/api/product/${id}`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
        throw new Error('unable to fetch data')
    }

    return res.json()
}


const SingleProduct = async ({params}:{params: {id: number}}) => {


    const data: Product = await getData(params.id)


    
    

  return (
      <div>
            <div className='bg-orange-100 px-4 text-yellow-800 my-8 md:px-6 md:text-4xl h-32 flex items-center justify-start text-2xl md:6xl font-bold mt-[100px]'>
                <Link href='/'>
                    
                    Home
              </Link>
              <Link href='/product'>
              <span className=' text-yellow-800 px-4'>/ Product</span>
              </Link>
               <span className=' text-yellow-950'>/ Single</span>

            </div>
          <div>
              <Link href='/product'>
                   <button className='uppercase p-2 text-white rounded-md text-lg bg-text-yellow-800'>back to products</button>
              </Link>
          </div>
          
          <SingleCartCont data={ data} />
          {/* <AddToCart product={ data} />
           */}
         
    </div>
  )
}

export default SingleProduct





// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'
// import AddToCart from 'src/components/AddToCart'
// import AddToCartBtn from 'src/components/AddToCartBtn'
// //import AddToCart from 'src/app/(foodcomponents)/AddToCart'
// //import AddToCart from 'src/components/AddToCart'
// //import Price from 'src/components/Price'

// export type Product = { id: number
//       image: string
//       price: number
//       title: string
//      category?: string
//     description?: string
//      quantity:   number
       
// }

// interface Props {
//   onIncrease: () => void;
//   onDecrease: () => void;
//   qty: number;
// }
    
// async function getData(id:number) {
//     const res = await fetch(`http://localhost:3000/api/product/${id}`, {
//         cache: 'no-store'
//     })
    
//     if (!res.ok) {
//         throw new Error('unable to fetch data')
//     }

//     return res.json()
// }


// const SingleProduct = async ({params}:{params: {id: number}}) => {


//     const data: Product = await getData(params.id)
    
    

//   return (
//       <div>
//             <div className='bg-orange-100 px-4 text-yellow-800 my-8 md:px-6 md:text-4xl h-32 flex items-center justify-start text-2xl md:6xl font-bold '>
//                 <Link href='/'>
                    
//                     Home
//               </Link>
//               <Link href='/product'>
//               <span className=' text-yellow-800 px-4'>/ Product</span>
//               </Link>
//                <span className=' text-yellow-950'>/ Single</span>

//             </div>
//           <div>
//               <Link href='/product'>
//                    <button className='uppercase p-2 text-white rounded-md text-lg bg-text-yellow-800'>back to products</button>
//               </Link>
//           </div>
          
//           <div className='lg:flex lg:gap-7 lg:h-screen'>
//               <div className='relative h-[50vh] lg:h-screen w-full px-4 flex-1'>
                  
//                   <img src={data.image} alt="image" className='h-[100%] w-full rounded-lg object-contain' />
//               </div>
//               <div className='flex flex-col gap-5 tracking-wider px-4 my-8 py-4 flex-1 lg:h-[80%]'>
//                   <h1 className='text-3xl md:5xl font-bold '>{ data.title}</h1>
//                   <div className='text-lg  border-b-2 pb-4'>
//                     { data.description}       
//                   </div>
//                   <div className='font-bold text-2xl'>
//                      $ {data.price}
//                   </div>
//                   {/* <AddToCartBtn singleproduct={data} /> */}
                  
//               </div>
//           </div>
          

//           <AddToCart product={ data} />
          
         
//     </div>
//   )
// }

// export default SingleProduct


