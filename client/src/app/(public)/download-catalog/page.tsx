
'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Download, Share2, Eye } from 'lucide-react'
import HeroBanner from '@/features/HeroBanner'
import ProductBanner from "@/assets/images/product-banner.webp"

// Catalog data with multiple pages
const catalogPages = [
  {
    id: 1,
    title: "Gạch Đỏ Cổ Điển",
    category: "Chuẩn",
    description: "Gạch đỏ cổ điển với chất lượng cao, phù hợp cho các công trình truyền thống và hiện đại.",
    specifications: {
      size: "215mm x 102mm x 65mm",
      weight: "2.8kg/viên",
      strength: "≥ 10 MPa",
      waterAbsorption: "≤ 20%"
    },
    features: [
      "Chất lượng cao, bền vững",
      "Thân thiện môi trường", 
      "Dễ dàng thi công",
      "Chống thấm nước tốt"
    ],
    applications: ["Nhà ở", "Văn phòng", "Công trình công cộng"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
  },
  {
    id: 2,
    title: "Gạch Nâu Truyền Thống",
    category: "Chuẩn",
    description: "Gạch nâu truyền thống mang đến vẻ đẹp cổ điển và sang trọng cho mọi công trình.",
    specifications: {
      size: "215mm x 102mm x 65mm",
      weight: "2.8kg/viên",
      strength: "≥ 10 MPa",
      waterAbsorption: "≤ 20%"
    },
    features: [
      "Màu sắc ấm áp",
      "Bề mặt nhẵn mịn",
      "Độ bền cao",
      "Dễ bảo trì"
    ],
    applications: ["Biệt thự", "Nhà hàng", "Khách sạn"],
    image: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=800&q=80"
  },
  {
    id: 3,
    title: "Gạch Xám Hiện Đại",
    category: "Chuẩn",
    description: "Gạch xám hiện đại với thiết kế tối giản, phù hợp cho các công trình đương đại.",
    specifications: {
      size: "215mm x 102mm x 65mm",
      weight: "2.8kg/viên",
      strength: "≥ 10 MPa",
      waterAbsorption: "≤ 20%"
    },
    features: [
      "Thiết kế hiện đại",
      "Màu sắc trung tính",
      "Linh hoạt trong ứng dụng",
      "Chất lượng ổn định"
    ],
    applications: ["Văn phòng", "Căn hộ", "Công trình công cộng"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
  },
  {
    id: 4,
    title: "Gạch Khổ Lớn",
    category: "Khổ Lớn",
    description: "Gạch khổ lớn giúp giảm thời gian thi công và tạo ra bề mặt liền mạch, hiện đại.",
    specifications: {
      size: "290mm x 90mm x 50mm",
      weight: "3.2kg/viên",
      strength: "≥ 12 MPa",
      waterAbsorption: "≤ 18%"
    },
    features: [
      "Kích thước lớn",
      "Thi công nhanh",
      "Bề mặt liền mạch",
      "Tiết kiệm vữa"
    ],
    applications: ["Tòa nhà cao tầng", "Trung tâm thương mại", "Công trình công nghiệp"],
    image: "https://images.unsplash.com/photo-1584622650111-993a426bcf0c?w=800&q=80"
  },
  {
    id: 5,
    title: "Gạch Ốp Mỏng",
    category: "Ốp",
    description: "Gạch ốp mỏng nhẹ, dễ thi công, phù hợp cho việc cải tạo và trang trí.",
    specifications: {
      size: "215mm x 102mm x 20mm",
      weight: "1.2kg/viên",
      strength: "≥ 8 MPa",
      waterAbsorption: "≤ 15%"
    },
    features: [
      "Trọng lượng nhẹ",
      "Dễ thi công",
      "Tiết kiệm chi phí",
      "Đa dạng màu sắc"
    ],
    applications: ["Cải tạo nhà", "Trang trí nội thất", "Công trình nhỏ"],
    image: "https://images.unsplash.com/photo-1582794543462-0d7922e50cf5?w=800&q=80"
  },
  {
    id: 6,
    title: "Gạch Có Hoa Văn",
    category: "Có Hoa Văn",
    description: "Gạch có hoa văn tạo điểm nhấn đặc biệt, mang đến vẻ đẹp độc đáo cho công trình.",
    specifications: {
      size: "215mm x 102mm x 65mm",
      weight: "2.8kg/viên",
      strength: "≥ 10 MPa",
      waterAbsorption: "≤ 20%"
    },
    features: [
      "Hoa văn đa dạng",
      "Tạo điểm nhấn",
      "Chất lượng cao",
      "Dễ vệ sinh"
    ],
    applications: ["Lối đi", "Sân vườn", "Trang trí tường"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
  }
]

export default function CatalogPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const bookRef = useRef<HTMLDivElement>(null)

  const nextPage = () => {
    if (currentPage < Math.ceil(catalogPages.length / 2) - 1 && !isFlipping) {
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(prev => prev + 1)
        setIsFlipping(false)
      }, 300)
    }
  }

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(prev => prev - 1)
        setIsFlipping(false)
      }, 300)
    }
  }

  const currentPageData = catalogPages[currentPage]

  return (
    <div className="min-h-screen bg-gray-50"> 
      {/* Book Interface */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Book Container */}
          <div 
            ref={bookRef}
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ aspectRatio: '4/3' }}
          >
            {/* Book Spine */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-800 to-gray-600 z-10"></div>
            
            {/* Book Pages - Left and Right */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Left Page */}
                <div className="w-1/2 border-r border-gray-200 relative">
                  <div className="h-full px-6 flex flex-col justify-center items-center">
                    {/* Page Number */}
                    <div className="absolute top-4 left-4 text-sm text-gray-500">
                      {currentPage * 2 + 1}
                    </div>
                    
                    {/* Product Image */}
                    <div className="relative w-full h-5/6 rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={currentPageData.image}
                        alt={currentPageData.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      
                      {/* Product Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <span className="text-sm font-semibold uppercase tracking-wide text-green-300">
                          {currentPageData.category}
                        </span>
                        <h3 className="text-2xl font-bold mt-2">
                          {currentPageData.title}
                        </h3>
                        <p className="text-sm mt-2 opacity-90">
                          {currentPageData.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Page */}
                <div className="w-1/2 relative">
                  <div className="h-full px-6 flex flex-col justify-center items-center">
                    {/* Page Number */}
                    <div className="absolute top-4 right-4 text-sm text-gray-500">
                      {currentPage * 2 + 2}
                    </div>
                    
                    {/* Second Product Image */}
                    <div className="relative w-full h-5/6 rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={catalogPages[(currentPage + 1) % catalogPages.length]?.image || currentPageData.image}
                        alt={catalogPages[(currentPage + 1) % catalogPages.length]?.title || currentPageData.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      
                      {/* Product Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <span className="text-sm font-semibold uppercase tracking-wide text-green-300">
                          {catalogPages[(currentPage + 1) % catalogPages.length]?.category || currentPageData.category}
                        </span>
                        <h3 className="text-2xl font-bold mt-2">
                          {catalogPages[(currentPage + 1) % catalogPages.length]?.title || currentPageData.title}
                        </h3>
                        <p className="text-sm mt-2 opacity-90">
                          {catalogPages[(currentPage + 1) % catalogPages.length]?.description || currentPageData.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Page Numbers */}
            <div className="absolute bottom-4 right-8 text-sm text-gray-500">
              {currentPage + 1} / {Math.ceil(catalogPages.length / 2)}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0 || isFlipping}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                currentPage === 0 || isFlipping
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Trang trước
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(catalogPages.length / 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isFlipping) {
                      setIsFlipping(true)
                      setTimeout(() => {
                        setCurrentPage(index)
                        setIsFlipping(false)
                      }, 300)
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentPage
                      ? 'bg-green-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(catalogPages.length / 2) - 1 || isFlipping}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                currentPage === Math.ceil(catalogPages.length / 2) - 1 || isFlipping
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-lg'
              }`}
            >
              Trang sau
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button className="flex items-center px-6 py-3 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Tải PDF
            </button>
            <button className="flex items-center px-6 py-3 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
              <Share2 className="w-5 h-5 mr-2" />
              Chia sẻ
            </button>
            <button className="flex items-center px-6 py-3 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
              <Eye className="w-5 h-5 mr-2" />
              Xem toàn màn hình
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}