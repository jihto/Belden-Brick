'use client'
import React, { useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, gridContainer, gridItem, cardHover } from '@/utils/animations';

export default function NewsBlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const posts = [
    {
      id: 1,
      number: "05",
      date: "09-2025",
      title: "Phong Cách Nội Thất Cottagecore - Hơi Thở Đồng Quê Giữa Đời Sống Hiện Đại",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
      category: "Xu Hướng Thiết Kế"
    },
    {
      id: 2,
      number: "04",
      date: "09-2025",
      title: "Phong Cách Nội Thất Tự Nhiên - Bàn Giao Hướng Sống Hiện Đại Và Thanh Lịch",
      image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80",
      category: "Dự Án Hoàn Thành",
      featured: true
    },
    {
      id: 3,
      number: "03",
      date: "09-2025",
      title: "Phong Cách Nội Thất Hiện Đại - Tối Giản Với Điểm Nhấn Ấm Áp Và Cá Tính",
      image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&q=80",
      category: "Thiết Kế Nội Thất"
    }
  ];

  return (
    <div ref={ref} className="bg-gradient-to-br from-green-50 to-emerald-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <div className="flex items-center gap-3 mb-4">
              <motion.h2 
                className="text-5xl font-bold text-green-900"
                variants={fadeInUp}
              >
                Tin Tức & Sự Kiện
              </motion.h2>
            </div>
            <motion.p 
              className="text-xl text-green-700"
              variants={fadeInUp}
            >
              Cập nhật xu hướng và dự án mới nhất
            </motion.p>
          </motion.div>
          <motion.button 
            className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Xem Thêm</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Blog Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={gridContainer}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                post.featured ? 'md:col-span-1' : ''
              }`}
              variants={gridItem} 
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent"></div>

                {/* Number Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white rounded-xl px-4 py-2 shadow-lg">
                    <div className="text-4xl font-bold text-green-600">{post.number}</div>
                    <div className="flex items-center gap-1 text-xs text-green-700 font-semibold">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>

                {/* Featured Badge */}
                {post.featured && (
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      Nổi Bật
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-green-900 font-bold text-xl leading-tight mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {post.title}
                </h3>

                <motion.button 
                  className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  <span>Đọc thêm</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-green-600 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View More Button */}
        <motion.div 
          className="mt-8 flex justify-center md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Xem Thêm</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}