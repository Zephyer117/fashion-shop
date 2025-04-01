import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const searchProductsByName = async (searchParam: string) => {
    const PRODUCT_SEARCH_QUERY = defineQuery(`
        *[
            _type == "product" && (
                name match $searchParam ||
                description match $searchParam ||
                brand match $searchParam ||
                tags match $searchParam
            )
        ] | order(name asc) {
            _id,
            name,
            slug,
            mainImage {
                asset->,
                alt,
                caption
            },
            description,
            price,
            categories[]-> {
                _id,
                title,
                slug
            },
            stock,
            sku,
            brand,
            rating,
            features,
            specifications,
            isNew,
            isOnSale,
            saleEndDate,
            tags,
            metaDescription,
            metaKeywords
        }
    `);

    try {
        const products = await sanityFetch({
            query: PRODUCT_SEARCH_QUERY,
            params: {
                searchParam: `*${searchParam}*`,
            },
        });
        return products.data || [];
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
};