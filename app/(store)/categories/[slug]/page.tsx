import ProductView from "@/components/ProductView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";


async function CategoryPage({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params;
    const products  = await getProductsByCategory(slug);
    const categories = await getAllCategories();

    return (
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-300 py-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {slug.split("-")
            .map((word)=>word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          </h1>
          <ProductView products={products} categories={categories}/>
        </div>
      </div>
    )
}   

export default CategoryPage;
