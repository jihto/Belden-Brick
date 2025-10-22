'use client'

import React, { useState, useRef } from 'react';
import { Home, Building2, Store, Warehouse, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, textReveal, imageReveal } from '@/utils/animations';

export default function SolutionsTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const solutions = [
    {
      id: 0,
      title: "Nhà Ở",
      icon: Home,
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
      description: "Giải pháp hoàn hảo cho không gian sống.",
      content: "Chúng tôi cung cấp các dòng gạch chất lượng cao, thân thiện với môi trường, đảm bảo an toàn tuyệt đối cho trẻ em và người lớn tuổi. Với đa dạng mẫu mã từ cổ điển đến hiện đại, gạch của chúng tôi giúp tạo nên không gian sống lý tưởng cho mọi thành viên trong gia đình.",
      features: [
        { icon: Sparkles, text: "Đa dạng màu sắc và kiểu dáng" },
        { icon: ShieldCheck, text: "Chống trơn trượt, an toàn" },
        { icon: Home, text: "Dễ vệ sinh, bền đẹp theo thời gian" }
      ],
      stats: [
        { number: "10+", label: "Năm bảo hành" },
        { number: "500+", label: "Mẫu thiết kế" },
        { number: "99%", label: "Khách hài lòng" }
      ]
    },
    {
      id: 1,
      title: "Chung Cư",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      description: "Nâng tầm đẳng cấp cho các dự án",
      content: "Dòng gạch chuyên dụng cho các tòa nhà chung cư cao tầng với khả năng chịu tải trọng cao, chống cháy lan tốt và đáp ứng các tiêu chuẩn xanh quốc tế. Thiết kế đồng nhất, tạo sự sang trọng và đẳng cấp cho toàn bộ dự án từ sảnh đến hành lang, từ phòng khách đến ban công.",
      features: [
        { icon: Building2, text: "Chịu tải trọng cao tầng" },
        { icon: ShieldCheck, text: "Chống cháy chuẩn A1" },
        { icon: Sparkles, text: "Thiết kế sang trọng, hiện đại" }
      ],
      stats: [
        { number: "200+", label: "Dự án hoàn thành" },
        { number: "50K+", label: "Căn hộ ứng dụng" },
        { number: "15", label: "Năm kinh nghiệm" }
      ]
    },
    {
      id: 2,
      title: "Văn Phòng",
      icon: Store,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      description: "Giải pháp gạch chuyên nghiệp .",
      content: "Các sản phẩm gạch được thiết kế đặc biệt cho môi trường thương mại với lưu lượng người qua lại cao. Khả năng chống mài mòn vượt trội, dễ bảo trì và tạo ấn tượng chuyên nghiệp. Phù hợp cho trung tâm thương mại, showroom, văn phòng làm việc và các không gian kinh doanh.",
      features: [
        { icon: Store, text: "Chịu lưu lượng cao" },
        { icon: ShieldCheck, text: "Chống mài mòn cực tốt" },
        { icon: Sparkles, text: "Dễ bảo trì, tiết kiệm chi phí" }
      ],
      stats: [
        { number: "300+", label: "Văn phòng" },
        { number: "150+", label: "Trung tâm TM" },
        { number: "20", label: "Năm bảo hành" }
      ]
    },
    {
      id: 3,
      title: "Công Nghiệp",
      icon: Warehouse,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
      description: "Gạch công nghiệp siêu bền.",
      content: "Dòng gạch công nghiệp với độ cứng và khả năng chịu tải vượt trội, chống hóa chất, chống thấm dầu mỡ. Thiết kế chống trơn ngay cả khi ướt, đảm bảo an toàn lao động. Giải pháp tối ưu cho các nhà máy, xưởng sản xuất, khu logistics và kho bãi công nghiệp.",
      features: [
        { icon: Warehouse, text: "Chịu tải trọng xe nặng" },
        { icon: ShieldCheck, text: "Chống hóa chất, dầu mỡ" },
        { icon: Sparkles, text: "An toàn lao động cao" }
      ],
      stats: [
        { number: "100+", label: "Nhà máy" },
        { number: "50+", label: "Kho logistics" },
        { number: "99.9%", label: "Độ bền" }
      ]
    }
  ];

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-start mb-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-green-900"
            variants={textReveal}
          >
            Giải Pháp Toàn Diện
          </motion.h2> 
        </motion.div>

        {/* Main Content Grid */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-start"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Left Side - Tabs and Content */}
          <motion.div 
            className="space-y-8"
            variants={fadeInLeft}
          >
            {/* Tabs Navigation */}
            <motion.div 
              className="relative"
              variants={staggerContainer}
            >
              <motion.div 
                className="flex justify-center items-center"
                variants={staggerItem}
              >
                {solutions.map((solution, index) => { 
                  return (
                    <motion.button
                      key={solution.id}
                      onClick={() => setActiveTab(index)}
                      className={`w-full max-md:text-sm flex justify-center items-center hover:text-green-600 text-center pb-2 md:py-4 gap-4 font-semibold transition-all duration-300 ${
                        activeTab === index
                          ? 'text-green-600'
                          : 'text-black'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    > 
                      <span>{solution.title}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
              
              {/* Animated Underline */}
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-green-600 transition-all duration-300 ease-out"
                style={{
                  width: `${100 / solutions.length}%`,
                  transform: `translateX(${activeTab * 100}%)`
                }}
                layoutId="activeTab"
              >
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <AnimatePresence mode="wait">
              <motion.div 
                className="space-y-4"
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <motion.h3 
                    className="text-3xl font-bold text-green-900 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {solutions[activeTab].description}
                  </motion.h3>
                  <motion.p 
                    className="text-green-700 text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {solutions[activeTab].content}
                  </motion.p>
                </motion.div>

                {/* Features */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {solutions[activeTab].features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <motion.div 
                        key={index} 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      >
                        <motion.div 
                          className="bg-green-100 p-2 rounded-lg"
                          whileHover={{ scale: 1.1 }}
                        >
                          <FeatureIcon size={20} className="text-green-600" />
                        </motion.div>
                        <span className="text-green-800">{feature.text}</span>
                      </motion.div>
                    );
                  })}
                </motion.div> 

                {/* CTA Button */}
                <motion.button 
                  className="w-fit bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Xem Thêm
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div 
            className="relative"
            variants={fadeInRight}
          >
            <motion.div 
              className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  src={solutions[activeTab].image}
                  alt={solutions[activeTab].title}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  key={activeTab}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}