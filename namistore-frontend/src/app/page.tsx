// import FeaturedProducts from '@/components/home/FeaturedProducts'
import Hero from '@/components/home/Hero'
import LatestProducts from '@/components/home/LatestProducts'
import Navbar from '@/components/layout/Navbar'
// import Categories from '@/components/home/Categories'
import Footer from '@/components/layout/Footer'
// import Newsletter from '@/components/home/Newsletter'

export default function Home(){
  return(

    <>
    <Navbar/>
    <Hero/>
    {/* <Categories/> */}
    {/* <FeaturedProducts/> */}
    <LatestProducts/>
    {/* <Newsletter/> */}
    <Footer/>
    </>
  )
}