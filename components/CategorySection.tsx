'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Shirt, 
  Watch, 
  Laptop, 
  Smartphone, 
  Headphones, 
  Camera,
  Gamepad2,
  ShoppingBag
} from 'lucide-react';

const categories = [
  {
    name: 'Clothing',
    icon: Shirt,
    href: '/categories/clothing',
  },
  {
    name: 'Accessories',
    icon: Watch,
    href: '/categories/accessories',
  },
  {
    name: 'Electronics',
    icon: Laptop,
    href: '/categories/electronics',
  },
  {
    name: 'Phones',
    icon: Smartphone,
    href: '/categories/phones',
  },
  {
    name: 'Audio',
    icon: Headphones,
    href: '/categories/audio',
  },
  {
    name: 'Cameras',
    icon: Camera,
    href: '/categories/cameras',
  },
  {
    name: 'Gaming',
    icon: Gamepad2,
    href: '/categories/gaming',
  },
  {
    name: 'Others',
    icon: ShoppingBag,
    href: '/categories/others',
  },
];

export default function CategorySection() {
  const pathname = usePathname();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const isActive = pathname === category.href;
            return (
              <Link
                key={category.name}
                href={category.href}
                className={`group flex flex-col items-center p-4 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-primary'
                }`}
              >
                <category.icon
                  className={`h-8 w-8 mb-2 ${
                    isActive ? 'text-white' : 'text-gray-600 group-hover:text-primary'
                  }`}
                />
                <span className="text-sm font-medium text-center">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
} 