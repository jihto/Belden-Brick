'use client';

import HeroBanner from '@/features/HeroBanner';
import { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react'; 
import Image from 'next/image';

// Design data structure
interface Design {
  id: number;
  title: string;
  category: string;
  image: string;
  description?: string;
}

// Sample design data
const designs: Design[] = [
  {
    id: 1,
    title: "Thiết kế nhà phố hiện đại",
    category: "Nhà ở",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Thiết kế nhà phố với phong cách hiện đại, tối giản"
  },
  {
    id: 2,
    title: "Biệt thự sang trọng",
    category: "Nhà ở",
    image: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Biệt thự cao cấp với thiết kế thanh lịch"
  },
  {
    id: 3,
    title: "Văn phòng công ty",
    category: "Thương mại",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Văn phòng hiện đại với không gian làm việc hiệu quả"
  },
  {
    id: 4,
    title: "Nhà hàng cao cấp",
    category: "Nhà hàng",
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Thiết kế nhà hàng với không gian ấm cúng"
  },
  {
    id: 5,
    title: "Căn hộ chung cư",
    category: "Nhà ở",
    image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Căn hộ chung cư với thiết kế tối ưu không gian"
  },
  {
    id: 6,
    title: "Khách sạn resort",
    category: "Thương mại",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Resort cao cấp với view biển tuyệt đẹp"
  },
  {
    id: 7,
    title: "Quán cà phê",
    category: "Nhà hàng",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Quán cà phê với không gian ấm cúng"
  },
  {
    id: 8,
    title: "Cửa hàng bán lẻ",
    category: "Thương mại",
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Cửa hàng bán lẻ với thiết kế hiện đại"
  }
];

const categories = ["Tất Cả", "Nhà ở", "Thương mại", "Nhà hàng"];

export default function DesignPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất Cả");

  const filteredDesigns = selectedCategory === "Tất Cả" 
    ? designs 
    : designs.filter(design => design.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <HeroBanner
        title="Thiết kế của chúng tôi"
        subtitle="Khám phá những thiết kế kiến trúc độc đáo và sáng tạo"
        backgroundImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Home className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Thiết kế</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Filter Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Danh mục thiết kế</h2>
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

          {/* Designs Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDesigns.map((design) => (
                <div key={design.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Design Image */}
                  <div className="aspect-4/3 overflow-hidden">
                    <Image
                      width={100}
                      height={100}
                      src={design.image}
                      alt={design.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Design Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {design.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {design.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* No designs message */}
            {filteredDesigns.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Không tìm thấy thiết kế nào trong danh mục này.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}