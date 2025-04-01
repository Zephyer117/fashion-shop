'use client'

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation';

const categories = [
  {
    name: 'Clothing',
    href: '/categories/clothing',
  },
  {
    name: 'Accessories',
    href: '/categories/accessories',
  },
  {
    name: 'Electronics',
    href: '/categories/electronics',
  },
  {
    name: 'Phones',
    href: '/categories/phones',
  },
  {
    name: 'Audio',
    href: '/categories/audio',
  },
  {
    name: 'Cameras',
    href: '/categories/cameras',
  },
  {
    name: 'Gaming',
    href: '/categories/gaming',
  },
  {
    name: 'Others',
    href: '/categories/others',
  },
];

const Footer = () => {
  const pathname = usePathname();
  
  return (
    <footer className='bg-white text-gray-700 border-t'>
      {/* Newsletter Section */}
      <div className='bg-gray-50 py-12'>
        <div className='container mx-auto px-4'>
          <div className='max-w-2xl mx-auto text-center'>
            <h2 className='text-2xl font-bold mb-4'>Let's get in touch</h2>
            <p className='text-gray-600 mb-6'>Sign up for our newsletter and receive 10% off your first order</p>
            <form className='flex gap-4 max-w-md mx-auto'>
              <input 
                type="email" 
                placeholder="Enter your email"
                className='flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button 
                type="submit"
                className='px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors'
              >
                Subscribe now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand Section */}
          <div className='flex flex-col justify-center items-center md:items-start space-y-4'>
            <div className='relative w-20 h-20'>
              <Image 
                src="/LZG.png" 
                alt="LZG Logo" 
                className='object-contain'
                priority
                fill
                sizes="(max-width: 768px) 80px, 80px"
              />
            </div>
            <Link 
              href="/" 
              className="text-3xl font-bold text-black hover:text-gray-600 transition-colors"
            >
              Pinaccle Fashion
            </Link>
            <p className='text-md text-gray-600 text-center md:text-left'>
              Your one-stop destination for fashion and lifestyle products.
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold text-black'>Quick link</h2>
            <ul className='space-y-2 text-gray-600'>
              <li><Link href="/account" className='hover:text-black transition-colors'>My account</Link></li>
              <li><Link href="/cart" className='hover:text-black transition-colors'>Cart</Link></li>
              <li><Link href="/wishlist" className='hover:text-black transition-colors'>Wishlist</Link></li>
              <li><Link href="/compare" className='hover:text-black transition-colors'>Product Compare</Link></li>
            </ul>
          </div>

          {/* Company Info */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold text-black'>Company</h2>
            <ul className='space-y-2 text-gray-600'>
              <li><Link href="/about" className='hover:text-black transition-colors'>About Us</Link></li>
              <li><Link href="/careers" className='hover:text-black transition-colors'>Careers</Link></li>
              <li><Link href="/shipping" className='hover:text-black transition-colors'>Delivery Information</Link></li>
              <li><Link href="/privacy" className='hover:text-black transition-colors'>Privacy Policy</Link></li>
              <li><Link href="/terms" className='hover:text-black transition-colors'>Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold text-black'>Categories</h2>
            <ul className='grid grid-cols-2 gap-2 text-gray-600'>
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    href={category.href}
                    className='hover:text-black transition-colors'
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-gray-600 text-sm'>
              © {new Date().getFullYear()} Pinaccle Fashion. All rights reserved.
            </p>
            <div className='flex gap-6 text-sm text-gray-600'>
              <Link href="/privacy" className='hover:text-black transition-colors'>Privacy Policy</Link>
              <Link href="/terms" className='hover:text-black transition-colors'>Terms of Service</Link>
              <Link href="/appointments" className='hover:text-black transition-colors'>Appointments</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer