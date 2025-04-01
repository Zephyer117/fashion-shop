import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { ChevronRight, Star, Truck } from "lucide-react";       
import { urlFor } from "@/lib/imageUrl";

async function ProductPage({ params }: { params: Promise<{ slug: string } >}) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return notFound();
    }

    const isOutOfStock = product.stock != null && product.stock <= 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb Navigation */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-primary">
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/categories" className="hover:text-primary">
                            Categories
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className={`relative aspect-square overflow-hidden rounded-xl shadow-lg bg-white ${isOutOfStock ? "opacity-50" : ""}`}>
                            {product.mainImage && (
                                <Image
                                    src={urlFor(product.mainImage) ? urlFor(product.mainImage)!.url() : ''}
                                    alt={product.mainImage.alt || product.name}
                                    fill
                                    className="object-contain transition-transform duration-300 hover:scale-105"
                                    priority
                                />
                            )}
                            {isOutOfStock && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <span className="text-white font-bold text-lg">Out of Stock</span>
                                </div>
                            )}
                        </div>
                        {/* Gallery Images */}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <div className="flex items-center space-x-4">
                                <div className="text-2xl font-bold text-primary">${product.price?.toFixed(2)}</div>
                                {product.originalPrice && (
                                    <div className="text-lg text-gray-500 line-through">
                                        ${product.originalPrice.toFixed(2)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Rating */}
                        {product.rating && (
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star 
                                            key={star} 
                                            className={`h-5 w-5 ${
                                                star <= product.rating.value 
                                                    ? "text-yellow-400 fill-current" 
                                                    : "text-gray-300"
                                            }`} 
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600">({product.rating.count} reviews)</span>
                            </div>
                        )}

                        {/* Description */}
                        <div className="prose max-w-none">
                            {product.description && Array.isArray(product.description) && (
                                <PortableText value={product.description} />
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="text-sm">
                            {isOutOfStock ? (
                                <span className="text-red-500">Out of Stock</span>
                            ) : (
                                <span className="text-green-500">In Stock</span>
                            )}
                        </div>


                        {/* Additional Information */}
                        <div className="border-t pt-6">
                            <h2 className="text-lg font-semibold mb-4">Product Details</h2>
                            <div className="space-y-2 text-gray-600">
                                <p><span className="font-medium">SKU:</span> {product.sku || 'N/A'}</p>
                                <p><span className="font-medium">Category:</span> {product.categories?.[0]?.name || 'N/A'}</p>
                                <p><span className="font-medium">Brand:</span> {product.brand || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;