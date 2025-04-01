import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: "name",
            title: "Product Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "mainImage",
            title: "Main Product Image",
            type: "image",
            options: {
                hotspot: true,
                metadata: ['palette', 'lqip'],
                storeOriginalFilename: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description: 'Important for SEO and accessibility.',
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                    description: 'Optional caption for the image.',
                }
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "gallery",
            title: "Product Gallery",
            type: "array",
            of: [
                {
                    type: "image",
                    options: {
                        hotspot: true,
                        metadata: ['palette', 'lqip'],
                        storeOriginalFilename: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                            description: 'Important for SEO and accessibility.',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                            description: 'Optional caption for the image.',
                        }
                    ]
                }
            ],
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "blockContent",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "originalPrice",
            title: "Original Price (for sales)",
            type: "number",
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{type: "reference", to: {type: "category"}}],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "stock",
            title: "Stock",
            type: "number",
            validation: Rule => Rule.required().min(0),
        }),
        defineField({
            name: "sku",
            title: "SKU",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "brand",
            title: "Brand",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "rating",
            title: "Product Rating",
            type: "object",
            fields: [
                {
                    name: "value",
                    title: "Rating Value",
                    type: "number",
                    validation: (Rule) => Rule.required().min(1).max(5),
                },
                {
                    name: "count",
                    title: "Number of Reviews",
                    type: "number",
                    validation: (Rule) => Rule.required().min(0),
                }
            ]
        }),
        defineField({
            name: "features",
            title: "Product Features",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "title",
                            title: "Feature Title",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "description",
                            title: "Feature Description",
                            type: "text",
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: "specifications",
            title: "Product Specifications",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "name",
                            title: "Specification Name",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "value",
                            title: "Specification Value",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: "isNew",
            title: "Is New Product",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "isOnSale",
            title: "Is On Sale",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "saleEndDate",
            title: "Sale End Date",
            type: "datetime",
        }),
        defineField({
            name: "tags",
            title: "Product Tags",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "metaDescription",
            title: "Meta Description",
            type: "text",
            validation: (Rule) => Rule.max(160),
        }),
        defineField({
            name: "metaKeywords",
            title: "Meta Keywords",
            type: "array",
            of: [{ type: "string" }],
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "mainImage",
            subtitle: "price",
            category: "categories.0.name",
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: `$${select.subtitle}${select.category ? ` • ${select.category}` : ''}`,
                media: select.media,
            }
        }
    }
});