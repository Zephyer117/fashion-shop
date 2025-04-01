"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { TrolleyIcon, PackageIcon } from '@sanity/icons'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { ClerkLoaded } from '@clerk/nextjs'
import SearchBar from './SearchBar'


interface BasketItem {
    quantity: number;
  }
  
  interface BasketState {
    items: BasketItem[];
  }
  
  const Header = () => {
      const {user} = useUser();
      {/*const itemCount = useBasketStore((state: BasketState) =>
          state.items.reduce((total: number, item: BasketItem) => total + item.quantity, 0)
      );
*/}
  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
    <div className="flex w-full flex-wrap justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-300 
        hover:opacity-50 cursor-pointer mx-auto sm:mx-0">
            Pinaccle Fashion
        </Link>

        <div className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">
            <SearchBar />
        </div>

        <div className="flex items-center space-x-8 sm:space-x-4 mt-4 md:mt-0 flex-1 sm:flex-none">
            <Link href="/basket" 
                className="flex-1 relative flex 
                justify-center sm:justify-start
                sm:flex-none items-center space-x-2 
                bg-blue-500 hover:bg-blue-700
                text-white font-bold py-2 px-4 rounded">
                <TrolleyIcon className="w-6 h-6"/>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full
                w-5 h-5 flex items-center justify-center text-xs">{5}</span>
                <span className="lg:text-md sm:text-sm">Cart</span>    {/* Cart button*/}
            </Link>

            <ClerkLoaded>
                <SignedIn>
                    <Link href="/orders" className="flex-1 relative flex 
                    justify-center sm:justify-start
                    sm:flex-none items-center space-x-2 
                    bg-blue-500 hover:bg-blue-700
                    text-white font-bold py-2 px-4 rounded">
                        <PackageIcon className="w-6 h-6"/>
                        <span className="lg:text-md sm:text-sm">My Orders</span>
                    </Link>
                </SignedIn>
                
                {user ? (
                    <div className="flex items-center space-x-2">
                        <UserButton />
                        <div className="hidden sm:block text-xs">
                            <p className="text-gray-400">Welcome back</p>
                            <p className="font-bold">{user.fullName}!</p>
                        </div>
                    </div>
                ) : (
                    <SignInButton mode="modal">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Sign In
                        </button>
                    </SignInButton>
                )}      
            </ClerkLoaded>
        </div>
    </div>
</header>
  )
}

export default Header