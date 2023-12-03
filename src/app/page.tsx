import Image from "next/image"
import Link from "next/link"
import CountingDown from "src/components/CountingDown"
import Enavbar from "src/components/Enavbar"
import Featured from "src/components/Featured"
import Hero from "src/components/Hero"
import Slider from "src/components/Slider"
import Vision from "src/components/Vision"
import { getCurrentUser } from "src/lib/session"
import Newsletter from 'src/components/Newsletter'

async function getData() {
        
     const res = await fetch('http://localhost:3000/api/product')
    
    if(!res.ok) {
     throw new Error("Data fetching failed")
        
     }

     return res.json()
     
}
 

const Home = async  () => {

    const data = await getData()
    
  return (
      <main className="px-4 pt-28">
          
          <div>
              <Hero/>
              
          </div>
          <div >
              {/* Featured Products */}
              <Featured products={data} />
              
          </div>
          <div>
              {/* compnany visison mission history */}
              <Vision />
          </div>
          <div>
              
              {/* newsletter */}
              <Newsletter />
              
              
          </div>
      </main>
  )
}

export default Home


