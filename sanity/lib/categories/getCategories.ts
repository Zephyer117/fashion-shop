import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getCategories = async () => {
  const CATEGORIES_QUERY = defineQuery(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }
  `);

  try {
    const response = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}; 