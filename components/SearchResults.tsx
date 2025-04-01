"use client";

import { useSearchParams } from "next/navigation";
import ProductView from "@/components/ProductView";
import { Product } from "@/sanity.types";
import { useState, useEffect } from "react";

interface SearchResultsProps {
  products: Product[];
  categories: any[];
}

// Common word variations mapping
const wordVariations: { [key: string]: string[] } = {
  'tshirt': ['shirt', 't-shirt', 'tee'],
  'shirt': ['tshirt', 't-shirt', 'tee'],
  't-shirt': ['tshirt', 'shirt', 'tee'],
  'tee': ['tshirt', 'shirt', 't-shirt'],
  'pants': ['trousers', 'jeans'],
  'trousers': ['pants', 'jeans'],
  'jeans': ['pants', 'trousers'],
  'sneakers': ['shoes', 'trainers'],
  'shoes': ['sneakers', 'trainers'],
  'trainers': ['sneakers', 'shoes'],
  'jacket': ['coat', 'blazer'],
  'coat': ['jacket', 'blazer'],
  'blazer': ['jacket', 'coat'],
  'sweater': ['jumper', 'pullover'],
  'jumper': ['sweater', 'pullover'],
  'pullover': ['sweater', 'jumper'],
  'dress': ['gown', 'frock'],
  'gown': ['dress', 'frock'],
  'frock': ['dress', 'gown'],
  'hat': ['cap', 'beanie'],
  'cap': ['hat', 'beanie'],
  'beanie': ['hat', 'cap'],
};

// Function to extract words from text
const extractWords = (text: string): string[] => {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ') // Remove special characters
    .split(/\s+/)
    .filter(word => word.length > 2); // Only keep words longer than 2 characters
};

// Function to generate variations for any word
const generateVariations = (word: string): string[] => {
  const variations: string[] = [];
  const normalizedWord = word.toLowerCase();
  
  // Add the original word
  variations.push(normalizedWord);
  
  // Add common prefixes/suffixes
  const prefixes = ['mini', 'maxi', 'oversized', 'slim', 'loose', 'fitted', 'long', 'short', 'wide', 'narrow'];
  const suffixes = ['s', 'es', 'ed', 'ing', 'er', 'est'];
  
  prefixes.forEach(prefix => {
    if (normalizedWord.startsWith(prefix)) {
      variations.push(normalizedWord.slice(prefix.length));
    } else {
      variations.push(`${prefix}${normalizedWord}`);
    }
  });
  
  suffixes.forEach(suffix => {
    if (normalizedWord.endsWith(suffix)) {
      variations.push(normalizedWord.slice(0, -suffix.length));
    } else {
      variations.push(`${normalizedWord}${suffix}`);
    }
  });
  
  // Add common color variations
  const colors = ['black', 'white', 'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'brown', 'gray', 'navy', 'beige', 'orange'];
  colors.forEach(color => {
    if (normalizedWord.startsWith(color)) {
      variations.push(normalizedWord.slice(color.length));
    } else {
      variations.push(`${color}${normalizedWord}`);
    }
  });
  
  // Add common material variations
  const materials = ['cotton', 'wool', 'silk', 'leather', 'denim', 'linen', 'polyester', 'nylon', 'spandex'];
  materials.forEach(material => {
    if (normalizedWord.startsWith(material)) {
      variations.push(normalizedWord.slice(material.length));
    } else {
      variations.push(`${material}${normalizedWord}`);
    }
  });
  
  return [...new Set(variations)];
};

// Function to build dynamic word variations from existing products
const buildDynamicVariations = (products: Product[], categories: any[]): { [key: string]: string[] } => {
  const dynamicVariations: { [key: string]: string[] } = {};
  
  // Extract words from product names
  products.forEach(product => {
    if (product.name) {
      const words = extractWords(product.name);
      words.forEach(word => {
        if (!dynamicVariations[word]) {
          dynamicVariations[word] = [];
        }
        // Add related words from the same product name
        words.forEach(relatedWord => {
          if (relatedWord !== word && !dynamicVariations[word].includes(relatedWord)) {
            dynamicVariations[word].push(relatedWord);
          }
        });
      });
    }
  });
  
  // Extract words from category names
  categories.forEach(category => {
    if (category.name) {
      const words = extractWords(category.name);
      words.forEach(word => {
        if (!dynamicVariations[word]) {
          dynamicVariations[word] = [];
        }
        // Add related words from the same category name
        words.forEach(relatedWord => {
          if (relatedWord !== word && !dynamicVariations[word].includes(relatedWord)) {
            dynamicVariations[word].push(relatedWord);
          }
        });
      });
    }
  });
  
  return dynamicVariations;
};

// Function to split compound words
const splitCompoundWord = (word: string): string[] => {
  const words = word.toLowerCase().split(/(?=[A-Z])|[-_\s]/);
  const result: string[] = [];
  
  words.forEach(word => {
    // Add the full word
    result.push(word);
    
    // Add common compound word splits
    if (word.includes('tshirt')) {
      result.push('t-shirt', 'shirt', 'tee');
    } else if (word.includes('sneaker')) {
      result.push('shoes', 'trainers');
    }
    
    // Add each character as a potential partial match
    if (word.length > 3) {
      for (let i = 0; i < word.length - 2; i++) {
        result.push(word.slice(i, i + 3));
      }
    }
  });
  
  return [...new Set(result)]; // Remove duplicates
};

export default function SearchResults({ products, categories }: SearchResultsProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicVariations, setDynamicVariations] = useState<{ [key: string]: string[] }>({});

  // Build dynamic variations when products or categories change
  useEffect(() => {
    const variations = buildDynamicVariations(products, categories);
    setDynamicVariations(variations);
  }, [products, categories]);

  // Function to get variations of a search term
  const getTermVariations = (term: string): string[] => {
    const normalizedTerm = term.toLowerCase();
    const staticVariations = wordVariations[normalizedTerm] || [];
    const dynamicTermVariations = dynamicVariations[normalizedTerm] || [];
    const compoundSplits = splitCompoundWord(normalizedTerm);
    const generatedVariations = generateVariations(normalizedTerm);
    return [...new Set([
      normalizedTerm,
      ...staticVariations,
      ...dynamicTermVariations,
      ...compoundSplits,
      ...generatedVariations
    ])];
  };

  // Function to check if text contains any variation
  const containsVariation = (text: string | undefined, variations: string[]): boolean => {
    if (!text) return false;
    const normalizedText = text.toLowerCase();
    return variations.some(variation => normalizedText.includes(variation));
  };

  useEffect(() => {
    setIsLoading(true);
    const searchTerms = query.toLowerCase().split(" ").filter(term => term.length > 0);
    
    const filteredProducts = products.filter((product: Product) => {
      if (searchTerms.length === 0) return true;
      
      return searchTerms.every(term => {
        // Get all variations of the search term
        const termVariations = getTermVariations(term);
        
        // Search in name
        if (containsVariation(product.name, termVariations)) return true;
        
        // Search in description
        if (product.description?.some((block: any) => 
          block._type === "block" && 
          block.children?.some((child: any) => 
            containsVariation(child.text, termVariations)
          )
        )) return true;

        // Search in price
        if (product.price?.toString().includes(term)) return true;

        // Search in tags if they exist
        if (product.tags?.some((tag: string) => 
          containsVariation(tag, termVariations)
        )) return true;

        // Search in categories if they exist
        if (product.categories?.some((category: any) => 
          containsVariation(category.name, termVariations)
        )) return true;

        return false;
      });
    });

    setSearchResults(filteredProducts);
    setIsLoading(false);
  }, [query, products, dynamicVariations]);

  const highlightText = (text: string) => {
    if (!query) return text;
    const terms = query.toLowerCase().split(" ").filter(term => term.length > 0);
    let highlightedText = text;
    
    terms.forEach(term => {
      const termVariations = getTermVariations(term);
      const regex = new RegExp(`(${termVariations.join('|')})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="bg-blue-100 dark:bg-blue-900">$1</span>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        {query ? (
          <>
            Search Results for "{highlightText(query)}"
          </>
        ) : (
          "All Products"
        )}
      </h1>
      <p className="text-gray-600 mb-6">
        Found {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'}
      </p>
      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found matching your search. Try different keywords or browse all products.
          </p>
        </div>
      ) : (
        <ProductView products={searchResults} categories={categories} />
      )}
    </div>
  );
} 