'use client'

import React, { useRef } from 'react';
import { Award, Users, Clock, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, scaleIn, imageReveal } from '@/utils/animations';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    {
      number: "25+",
      label: "Năm kinh nghiệm",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      number: "500+",
      label: "Dự án hoàn thành",
      icon: Award,
      color: "text-green-600"
    },
    {
      number: "10K+",
      label: "Khách hàng tin tưởng",
      icon: Users,
      color: "text-purple-600"
    },
    {
      number: "99%",
      label: "Độ hài lòng",
      icon: Shield,
      color: "text-orange-600"
    }
  ];

  const values = [
    {
      title: "Chất Lượng Vượt Trội",
      description: "Cam kết mang đến những sản phẩm gạch chất lượng cao nhất với công nghệ tiên tiến và quy trình sản xuất nghiêm ngặt.",
      icon: Award
    },
    {
      title: "Đổi Mới Liên Tục",
      description: "Không ngừng nghiên cứu và phát triển các sản phẩm mới, đáp ứng xu hướng thiết kế hiện đại và nhu cầu thị trường.",
      icon: CheckCircle
    },
    {
      title: "Phục Vụ Chuyên Nghiệp",
      description: "Đội ngũ tư vấn chuyên nghiệp, hỗ trợ khách hàng từ khâu thiết kế đến thi công, đảm bảo dự án hoàn hảo.",
      icon: Users
    }
  ];

  return (
    <div ref={ref} className="bg-white py-12 md:py-20 px-4 max-w-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-start mb-12 md:mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div 
            className="inline-block bg-green-100 text-green-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-2 md:mb-4"
            variants={fadeInUp}
          >
            Về Chúng Tôi
          </motion.div>
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-4"
            variants={fadeInUp}
          >
            Dẫn Đầu Thị Trường Gạch Cao Cấp
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed px-2"
            variants={fadeInUp}
          >
            Với hơn 25 năm kinh nghiệm trong ngành sản xuất và phân phối gạch, chúng tôi tự hào là đối tác tin cậy của hàng nghìn dự án lớn nhỏ trên toàn quốc.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 md:mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div 
                key={index}
                className="text-center group"
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              > 
                <motion.h3 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  {stat.number}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 font-medium text-xs sm:text-sm md:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Left Side - Image */}
          <motion.div 
            className="relative"
            variants={fadeInLeft}
          >
            <motion.div 
              className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80"
                alt="About Us"
                className="w-full h-full object-cover"
                variants={imageReveal}
              />
              <div className="absolute inset-0 bg-linear-to-t from-green-900/30 to-transparent"></div>
              
              {/* Floating Card */}
              <motion.div 
                className="absolute bottom-3 left-3 md:bottom-6 md:left-6 bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg md:shadow-xl max-w-xs md:max-w-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <Award size={16} className="text-white md:w-5 md:h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">Chứng Nhận ISO 9001</h4>
                </div>
                <p className="text-gray-600 text-xs md:text-sm">
                  Đạt tiêu chuẩn quốc tế về chất lượng và quản lý sản xuất
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="space-y-3 md:space-y-4"
            variants={fadeInRight}
          >
            <motion.div variants={staggerItem}>
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4"
                variants={fadeInUp}
              >
                Sứ Mệnh Của Chúng Tôi
              </motion.h3>
              <motion.p 
                className="text-base md:text-lg text-gray-700 leading-relaxed mb-2 md:mb-4"
                variants={fadeInUp}
              >
                Chúng tôi cam kết mang đến những sản phẩm gạch chất lượng cao nhất, 
                góp phần tạo nên những không gian sống đẹp và bền vững cho mọi gia đình Việt Nam.
              </motion.p>
              <motion.p 
                className="text-base md:text-lg text-gray-700 leading-relaxed"
                variants={fadeInUp}
              >
                Với công nghệ sản xuất hiện đại và đội ngũ chuyên gia giàu kinh nghiệm, 
                chúng tôi không ngừng đổi mới để đáp ứng mọi nhu cầu của khách hàng.
              </motion.p>
            </motion.div>

            {/* Values List */}
            <motion.div 
              className="px-2 space-y-3 md:space-y-4"
              variants={staggerContainer}
            >
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-3 md:gap-4 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors duration-300"
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                  > 
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">+ {value.title}</h4>
                      <p className="text-gray-600 text-xs md:text-base">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Button */}
            <motion.button 
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group text-sm md:text-base"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Tìm Hiểu Thêm</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform md:w-5 md:h-5" />
            </motion.button>
          </motion.div>
        </motion.div> 
      </div>
    </div>
  );
}