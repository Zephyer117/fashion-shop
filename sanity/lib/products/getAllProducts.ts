import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getAllProducts = async() =>{
    const ALL_PRODUCTS_QUERY = defineQuery(`
        *[
            _type == "product"
        ] | order(name asc) {
            _id,
            _type,
            _createdAt,
            _updatedAt,
            _rev,
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
                name
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
        }`);

    try {
        const products = await sanityFetch({
            query: ALL_PRODUCTS_QUERY,
        });
        return products.data || [];
    } catch (error) {
        console.error("ERROR FETCHING PRODUCTS", error);
        return [];
    }
}