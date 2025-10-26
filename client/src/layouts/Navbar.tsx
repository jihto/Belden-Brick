'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, Download, User, LogOut } from 'lucide-react'
import Link from 'next/link' 
import { Button } from '@/components/ui/button'
import logo from '@/assets/images/khoi-nguyen.png';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false) 
  const userDropdownRef = useRef<HTMLDivElement>(null)

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const menuItems = [
    {
      label: 'Giới thiệu',
      href: '/about'
    },
    {
      label: 'Sản phẩm',
      href: '/products',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Melamine', href: '/products?category=Melamine' },
        { label: 'Laminate', href: '/products?category=Laminate' },
        { label: 'Acrylic', href: '/products?category=Acrylic' }, 
      ]
    },
    {
      label: 'Ứng dụng thiết kế',
      href: '/design'
    }, 
    {
      label: 'Tải catalog',
      href: '/download-catalog',
      icon: Download
    }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  } 

  return (
    <nav className="shadow-lg sticky top-0 z-50 border-b border-green-200" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-3 flex-shrink-0">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src={logo.src}
            alt="Belden Brick Logo"
            width={120}
            style={{ height: "90px" }}
            className="object-contain"
          />
        </Link>

     <span
  style={{
    fontSize: "22px",
    fontWeight: 700,
    background: "linear-gradient(90deg, #1abc9c, #f1c40f)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "0.5px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
  }}
>
  Chuyên gia ván phủ{" "}
  <span
    style={{
      color: "#27ae60",
      fontWeight: 800,
      textShadow: "1px 1px 2px rgba(0,0,0,0.15)",
    }}
  >
    Melamine
  </span>
</span>

      </div>


          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.hasDropdown ? (
                    <div 
                      className="relative"
                      onMouseEnter={() => setHoveredDropdown(item.label)}
                      onMouseLeave={() => setHoveredDropdown(null)}
                    >
                      <Link
                        href={item.href}
                        className="text-green-800 hover:text-emerald-600 px-3 py-2 text-sm font-medium flex items-center transition-colors duration-200"
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Link>
                      
                      {hoveredDropdown === item.label && (
                        <div className="absolute top-full left-0 w-48  rounded-md shadow-lg py-1 z-50 border border-green-200">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-green-800 hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-200"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-green-800 hover:text-emerald-600 px-3 py-2 text-sm font-medium flex items-center transition-colors duration-200"
                    >
                      {item.icon && <item.icon className="mr-1 h-4 w-4" />}
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div> 

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-green-800 hover:text-emerald-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3  border-t border-green-200">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                    <div>
                      <Link
                        href={item.href}
                        className="text-green-800 hover:text-emerald-600 block px-3 py-2 text-base font-medium flex items-center"
                      >
                        {item.label}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Link>
                      <div className="pl-4 space-y-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="text-green-700 hover:text-emerald-600 block px-3 py-2 text-sm"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-green-800 hover:text-emerald-600 block px-3 py-2 text-base font-medium flex items-center"
                    >
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
               
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar