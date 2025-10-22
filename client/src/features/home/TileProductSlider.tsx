'use client'
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, scaleIn, imageReveal } from '@/utils/animations';

export default function TileProductSlider() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const tiles = [
    {
      id: 1,
      name: "Gạch Granite Cao Cấp",
      code: "GR-8001",
      size: "60x60 cm",
      description: "Gạch granite cao cấp với độ bền vượt trội, chống trầy xước và chống thấm tuyệt đối. Bề mặt bóng gương sang trọng, phù hợp cho không gian phòng khách, sảnh lớn.",
      features: ["Chống trầy xước", "Chống thấm nước", "Độ bền cao", "Bề mặt bóng gương"],
      image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80"
    },
    {
      id: 2,
      name: "Gạch Ceramic Vân Gỗ",
      code: "CE-7502",
      size: "15x80 cm",
      description: "Gạch ceramic vân gỗ tự nhiên, mang lại cảm giác ấm cúng cho không gian. Chống ẩm tốt hơn gỗ tự nhiên, dễ vệ sinh và bảo dưỡng.",
      features: ["Vân gỗ tự nhiên", "Chống ẩm tốt", "Dễ lau chùi", "Thân thiện môi trường"],
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80"
    },
    {
      id: 3,
      name: "Gạch Marble Tự Nhiên",
      code: "MB-9003",
      size: "80x80 cm",
      description: "Gạch marble với vân đá tự nhiên sang trọng, tạo điểm nhấn đẳng cấp cho không gian. Độ cứng cao, chịu lực tốt, phù hợp cho các công trình cao cấp.",
      features: ["Vân đá tự nhiên", "Sang trọng đẳng cấp", "Chịu lực tốt", "Độ cứng cao"],
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    },
    {
      id: 4,
      name: "Gạch Terrazzo Họa Tiết",
      code: "TZ-6504",
      size: "60x60 cm",
      description: "Gạch terrazzo với họa tiết độc đáo, kết hợp nhiều màu sắc tạo nên vẻ đẹp nghệ thuật. Phù hợp cho không gian hiện đại, cá tính.",
      features: ["Họa tiết độc đáo", "Đa dạng màu sắc", "Phong cách hiện đại", "Dễ phối hợp"],
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80"
    },
    {
      id: 5,
      name: "Gạch Porcelain Mờ",
      code: "PC-5505",
      size: "30x60 cm",
      description: "Gạch porcelain bề mặt mờ, chống trơn trượt tốt. Lý tưởng cho phòng tắm, bếp và các khu vực cần độ an toàn cao.",
      features: ["Chống trơn trượt", "An toàn cao", "Độ hút nước thấp", "Bền màu lâu dài"],
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % tiles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + tiles.length) % tiles.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div ref={ref} className="min-h-screen bg-green-50 to-emerald-100 py-16 px-4 overflowx-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-start mb-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-green-900 mb-4"
            variants={fadeInUp}
          >
            Bộ Sưu Tập Gạch
          </motion.h2>
          <motion.p 
            className="text-lg text-green-700"
            variants={fadeInUp}
          >
            Khám phá những sản phẩm gạch cao cấp của chúng tôi
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Slider Section */}
          <motion.div 
            className="relative"
            variants={fadeInLeft}
          >
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
              {/* Side Images (Blurred) - Hidden on mobile */}
              <AnimatePresence>
                {tiles.map((tile, index) => {
                  const offset = index - currentIndex;
                  const absOffset = Math.abs(offset);
                  
                  if (absOffset > 2) return null;

                  const translateX = offset * 100;
                  const scale = 1 - absOffset * 0.2;
                  const opacity = absOffset === 0 ? 1 : 0.5;
                  const zIndex = 10 - absOffset;
                  const blur = absOffset === 0 ? 0 : 8;

                  return (
                    <motion.div
                      key={`${tile.id}-${currentIndex}`}
                      className="absolute transition-all duration-500 ease-out cursor-pointer hidden md:block"
                      style={{
                        transform: `translateX(${translateX}%) scale(${scale})`,
                        opacity: opacity,
                        zIndex: zIndex,
                        filter: `blur(${blur}px)`
                      }}
                      onClick={() => goToSlide(index)}
                      whileHover={{ scale: scale * 1.05 }}
                      transition={{ duration: 0.3 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: opacity, scale: scale }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <motion.img
                        src={tile.image}
                        alt={tile.name}
                        className="w-80 h-96 object-cover rounded-2xl shadow-2xl"
                        key={`${tile.id}-img-${currentIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Mobile: Show only current image */}
              <div className="md:hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    src={tiles[currentIndex].image}
                    alt={tiles[currentIndex].name}
                    className="w-72 h-80 md:w-80 md:h-96 object-cover rounded-2xl shadow-2xl"
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Buttons */}
            <motion.button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all duration-300 shadow-lg z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-all duration-300 shadow-lg z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>

            {/* Dots Indicator */}
            <motion.div 
              className="flex justify-center gap-2 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {tiles.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'bg-green-600 w-10 h-3'
                      : 'bg-green-300 w-3 h-3 hover:bg-green-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Product Info Section */}
          <motion.div 
            className="space-y-6 p-4 md:pl-4 bg-green-50 to-emerald-100 rounded-2xl z-10"
            variants={fadeInRight}
          >
            <AnimatePresence mode="wait">
              <motion.div 
                className="transition-all duration-500"
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {tiles[currentIndex].code}
                </motion.div>
                
                <motion.h3 
                  className="text-3xl font-bold text-green-900 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {tiles[currentIndex].name}
                </motion.h3>
                
                <motion.div 
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                    <span className="text-green-700 font-semibold">Kích thước:</span>
                    <span className="text-green-900 ml-2 font-bold">{tiles[currentIndex].size}</span>
                  </div>
                </motion.div>

                <motion.p 
                  className="text-green-800 text-lg leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {tiles[currentIndex].description}
                </motion.p>

                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <motion.h4 
                    className="text-green-900 font-bold text-xl mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    Đặc điểm nổi bật:
                  </motion.h4>
                  <motion.div 
                    className="grid grid-cols-2 gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    {tiles[currentIndex].features.map((feature, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-green-800">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                >
                  <motion.button 
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 md:px-8 md:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Xem Chi Tiết
                  </motion.button>
                  <motion.button 
                    className="bg-white hover:bg-green-50 text-green-700 font-semibold px-4 py-2 md:px-8 md:py-4 rounded-lg transition-all duration-300 border-2 border-green-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Liên Hệ Tư Vấn
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}