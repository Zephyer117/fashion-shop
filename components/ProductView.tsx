import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";

interface ProductViewProps { 
    products: Product[];
    categories: Category[];
}

const ProductView = ({products, categories}: ProductViewProps) => {
    return (
        <div className="flex flex-col">

        {/*Categrories*/}
        <div className="w-full sm:w-[200px]">
            <CategorySelectorComponent categories={categories}/>
        </div>
        {/*Products*/}
        <div className="flex-1">
            <div>
                <ProductGrid products={products}/>
                <hr className="mt-4"/>
            </div>
        </div>
    </div>
    );
};

export default ProductView;