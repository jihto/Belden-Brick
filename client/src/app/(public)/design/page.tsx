'use client';

import HeroBanner from '@/features/HeroBanner';
import { useState } from 'react';
import { ChevronRight, Home, ArrowRight, Phone, Mail, MessageCircle, X } from 'lucide-react'; 
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
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

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
                <div 
                  key={design.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedDesign(design)}
                >
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
  
        {/* Services Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dịch vụ thiết kế của chúng tôi
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Chúng tôi cung cấp các dịch vụ thiết kế toàn diện cho mọi loại công trình
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Thiết kế kiến trúc
              </h3>
              <p className="text-gray-600">
                Thiết kế tổng thể công trình, hồ sơ kỹ thuật chi tiết, giấy phép xây dựng
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Thiết kế nội thất
              </h3>
              <p className="text-gray-600">
                Tư vấn phong cách, layout không gian, lựa chọn vật liệu và đồ nội thất
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Tư vấn xây dựng
              </h3>
              <p className="text-gray-600">
                Giám sát thi công, tư vấn giải pháp xây dựng, tiết kiệm chi phí
              </p>
            </div>
          </div>
        </div>

        {/* Design Dialog */}
        {selectedDesign && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedDesign(null)}
          >
            <div 
              className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDesign.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedDesign.category}</p>
                  {selectedDesign.description && (
                    <p className="text-gray-600 mt-2">{selectedDesign.description}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Image */}
              <div className="relative w-full h-[70vh] bg-gray-100">
                <Image
                  src={selectedDesign.image}
                  alt={selectedDesign.title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}