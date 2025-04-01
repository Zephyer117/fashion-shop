import SearchResults from "@/components/SearchResults";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

export default async function SearchPage() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return <SearchResults products={products} categories={categories} />;
}