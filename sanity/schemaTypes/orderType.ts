import { BasketIcon } from "@sanity/icons";
import { title } from "process";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
    
    name: "order",
    title: "Order",
    type: "document",  //Essential as this is an read type array
    icon: BasketIcon,
    fields: [
        defineField({
            name: "orderName",
            title: "Order Number",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "stripeCheckoutSessionID",
            title: "stripe Checkout Session ID", //Stripe ID 
            type: "string",
        }),
        defineField({
            name: "clerkUserID",
            title: "Store User ID", //clerkUserID ID
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "customerName",
            title: "Customer Name", //customerName ID 
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Customer Email", //email ID
            type: "string",
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: "products",
            title: "Products", //customerName ID 
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields : [
                        defineField({
                            name: "product",
                            title: "Product Bought",
                            type: "reference",
                            to: [{type: "product"}],
                        }),
                        defineField({
                            name: "Quantiy",
                            title: "Quantity Purchased",
                            type: "number",
                        }),
                    ],
                    preview: {
                        select: {
                            product: "product.name",
                            quantity: "quantity",
                            image: "product.image",
                            price: "product.price",
                            currency: "product.currency",
                        },
                        prepare(select){
                            return{
                                title: `${select.product} x ${select.quantity}`,
                                subtitle: `${select.price * select.quantity}`,
                                media: select.image,
                            };
                        }
                    }
                })
            ]
        }),
        defineField({
            name: "totalprice",
            title: "Total Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "currencyc",
            title: "Currency",
            type: "number",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "amountDiscount",
            title: "Amount Discount",
            type: "number",
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: "status",
            title: "Order Status",
            type: "string",
            options:{
                list: [
                    {title: "Pending", value:"pending"},
                    {title: "Paid", value:"paid"},
                    {title: "Shipper", value:"shipper"},
                    {title: "Delivered", value:"delivered"},
                    {title: "Canceled", value:"canceled"},
                ],
            },
        }),
    defineField({
        name: "orderDate",
        title: "Order Date",
        type: "datetime",
        validation: Rule => Rule.required(),
    })
    ],
    preview: {
        select: {
            name: "customerName",
            amount: "totalprice",
            currency: "currency",
            orderId: "orderNumber",
            mail: "email",
        },
        prepare(select) {
            const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
            return {
                title: `${select.name} (${orderIdSnippet})`,
                subtitle: `${select.amount} ${select.currency}, ${select.mail}`,
                media: BasketIcon,
            }
        }
    }
});