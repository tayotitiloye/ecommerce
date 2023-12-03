import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductCont from 'src/components/ProductCont'

export type ProductType = { id: number
      image: string
      price: number
      title: string
     category: string
     description?:string
      }[]



 async function getData() {
        
     const res = await fetch('http://localhost:3000/api/product', {
         cache: 'no-store'
     })
    
    if(!res.ok) {
     throw new Error("Data fetching failed")
        
     }

     return res.json()
     
 }

const Product = async () => {

    const data: ProductType = await getData()
                        
    const allCategories = ['all', ...new Set(data.map((item) => item.category))];
  
 
                    

    return (
      <main className=''>
              <div className='bg-orange-100 px-4 text-yellow-700 my-8 md:px-6 md:text-4xl h-32 flex items-center justify-start text-2xl md:6xl font-bold mt-[100px]'>
                   
                <Link href='/'>
                    
                    Home
                </Link>
                
            <span className=' text-yellow-950'>/ Product</span>
            </div>

            
            <ProductCont data={ data} allcat={allCategories} />
            
            
      </main>
    
  )
}

export default Product


