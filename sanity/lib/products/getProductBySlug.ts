import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async(slug: string) => {
    const PRODUCT_BY_ID_QUERY = `
    *[
        _type == "product" && slug.current == $slug
    ] | order(name asc) [0] {
        _id,
        name,
        slug,
        mainImage {
            asset->,
            alt,
            caption
        },
        gallery[] {
            asset->,
            alt,
            caption
        },
        description,
        price,
        originalPrice,
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
    }
`;

    try {
        const product = await sanityFetch({
            query: PRODUCT_BY_ID_QUERY,
            params: {
                slug,
            },
        });
        return product.data || null;
    } catch (error) {
        console.error("ERROR FETCHING DATA", error);
        return null;
    }
}
