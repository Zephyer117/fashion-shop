"use client"

import { Category } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchFiltersProps {
  categories: Category[];
  currentCategory?: string;
  currentMinPrice?: string;
  currentMaxPrice?: string;
  currentSort?: string;
}

export default function SearchFilters({
  categories,
  currentCategory,
  currentMinPrice,
  currentMaxPrice,
  currentSort,
}: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      {/* Category Filter */}

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={currentMinPrice || ""}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            className="w-1/2 p-2 border rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={currentMaxPrice || ""}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            className="w-1/2 p-2 border rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="mb-4">
        <label htmlFor="sort-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          id="sort-filter"
          value={currentSort || ""}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          className="w-full p-2 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
} 