import Carousel from "@/components/Carousel";
import CategorySection from "@/components/CategorySection";
import ProductView from "@/components/ProductView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";


export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

    return (
      <div>
        <Carousel />
        <CategorySection />
        {/* Render All Product */}
        <div className='flex flex-col items-center justify-top bg-gray-100 p-4 w-full'>
          <ProductView products={products} categories={categories}/>
        </div>
      </div>
    );
  }

  
 