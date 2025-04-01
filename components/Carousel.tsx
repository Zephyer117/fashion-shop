"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const carouselSlides = [
  {
    id: 1,
    image: '/banner1.jpg',
    title: 'New Summer Collection',
    description: 'Discover our latest summer styles',
    link: '/shop',
    buttonText: 'Shop Now'
  },
  {
    id: 2,
    image: '/banner2.jpg',
    title: 'Trending Accessories',
    description: 'Complete your look with our accessories',
    link: '/categories/accessories',
    buttonText: 'Explore'
  },
  {
    id: 3,
    image: '/banner3.jpg',
    title: 'Special Offers',
    description: 'Up to 50% off on selected items',
    link: '/shop?discount=true',
    buttonText: 'View Deals'
  }
]

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[500px] overflow-hidden">
      {carouselSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-8">{slide.description}</p>
                <Link href={slide.link}>
                  <Button className="bg-white text-black hover:bg-gray-100">
                    {slide.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Carousel Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              index === currentSlide ? "bg-white" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  )
} 