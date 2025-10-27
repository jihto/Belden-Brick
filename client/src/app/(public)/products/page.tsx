'use client';

import HeroBanner from '@/features/HeroBanner';
import { useState, useEffect } from 'react';
import ProductBanner from "@/assets/images/product-banner.webp";
import { apiClient } from '@/lib/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

// Product data structure from API
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  stock: number;
  imageUrl?: string;
  images?: string[];
  location?: string;
  year?: number;
  specifications?: {
    dimensions?: string;
    weight?: string;
    strength?: string;
    absorption?: string;
    color?: string;
    material?: string;
    features?: string[];
  } | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất Cả");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // Load products and categories from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load products and categories in parallel
        const [productsResponse, categoriesResponse] = await Promise.all([
          apiClient.makeRequest('/products?limit=100'),
          apiClient.makeRequest('/products/categories')
        ]);

        if (productsResponse.success && Array.isArray(productsResponse.data)) {
          setProducts(productsResponse.data);
        } else {
          setError('Không thể tải danh sách sản phẩm');
          return;
        }

        if (categoriesResponse.success && Array.isArray(categoriesResponse.data)) {
          console.log(categoriesResponse.data)
          setCategories(['Tất Cả', ...categoriesResponse.data]);
        } else {
          // Fallback: extract categories from products if API fails
          const uniqueCategories = Array.from(
            new Set(productsResponse.data.map((product: Product) => product.category))
          );
          setCategories(['Tất Cả', ...uniqueCategories]);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = selectedCategory === "Tất Cả" 
    ? products.filter(product => product.isActive)
    : products.filter(product => product.category === selectedCategory && product.isActive);

  return (
    <div className="min-h-screen bg-white">
        {/* Header */}
        <HeroBanner
            title="Sản phẩm của chúng tôi"
            subtitle="Khám phá những sản phẩm gạch cao cấp của chúng tôi"
            backgroundImage={ProductBanner.src}
        />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Home className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">  </span>
        </nav>        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-900"></div>
            <p className="mt-2 text-gray-600">Đang tải sản phẩm...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-green-900 text-white rounded hover:bg-green-800"
            >
              Thử lại
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Filter Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Danh mục sản phẩm</h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors rounded-md ${
                        selectedCategory === category
                          ? 'bg-green-900 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white overflow-hidden" onClick={() => router.push(`/products/${product.id}`)}>
                {/* Product Image */}
                <div className="aspect-square bg-gray-100">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl.startsWith('/uploads') 
                        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${product.imageUrl}`
                        : product.imageUrl}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-300 mx-auto mb-2 rounded"></div>
                        <p className="text-sm">Không có hình ảnh</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="mt-2  ">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p> 
                </div>
              </div>
            ))}
              </div>

              {/* No products message */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Không tìm thấy sản phẩm nào trong danh mục này.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}