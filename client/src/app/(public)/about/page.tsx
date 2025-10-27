'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  staggerItem, 
  textReveal
} from '@/utils/animations'

export default function AboutPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const stats = [
    { number: "20+", label: "Năm kinh nghiệm" },
    { number: "500+", label: "Dự án hoàn thành" },
    { number: "50K+", label: "Khách hàng tin tưởng" },
    { number: "99%", label: "Hài lòng" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-black mb-8 leading-tight"
              variants={fadeInUp}
            >
              Về Belden Brick
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-black mb-12"
              variants={fadeInUp}
            />
            <motion.p 
              className="text-2xl md:text-3xl text-black max-w-4xl leading-relaxed font-light"
              variants={fadeInUp}
            >
              Hơn hai thập kỷ kiến tạo những không gian sống đẳng cấp, 
              nơi nghệ thuật kiến trúc gặp gỡ chất lượng vượt trội.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section with Image */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInLeft}
            >
              <div className="aspect-[4/5] bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop" 
                  alt="Belden Brick Factory"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInRight}
              className="space-y-8"
            >
              <h2 className="text-5xl font-bold text-black leading-tight">
                Câu Chuyện<br />Của Chúng Tôi
              </h2>
              <div className="space-y-6 text-lg text-black leading-relaxed">
                <p>
                  Belden Brick được thành lập vào năm 2004 với một tầm nhìn đơn giản nhưng mạnh mẽ: 
                  mang đến cho thị trường Việt Nam những sản phẩm gạch có chất lượng ngang tầm quốc tế, 
                  được sản xuất ngay tại đất nước chúng ta.
                </p>
                <p>
                  Khởi đầu từ một xưởng sản xuất nhỏ với chỉ 20 công nhân, chúng tôi đã không ngừng 
                  đầu tư vào công nghệ, con người và quy trình sản xuất. Mỗi viên gạch Belden đều mang 
                  trong mình sự tâm huyết và trách nhiệm với chất lượng, được kiểm soát chặt chẽ qua 
                  từng công đoạn.
                </p>
                <p>
                  Hôm nay, với hơn 500 dự án lớn nhỏ trên khắp cả nước, từ những căn nhà phố nhỏ xinh 
                  đến các tòa nhà cao tầng và khu nghỉ dưỡng sang trọng, Belden Brick tự hào là đối tác 
                  tin cậy của hàng ngàn kiến trúc sư, nhà thầu và chủ đầu tư.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-12"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={staggerItem}
              >
                <h3 className="text-5xl md:text-6xl font-bold text-white mb-3">
                  {stat.number}
                </h3>
                <p className="text-gray-400 text-sm uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInLeft}
              className="space-y-8 md:order-2"
            >
              <h2 className="text-5xl font-bold text-black leading-tight">
                Sứ Mệnh & Cam Kết
              </h2>
              <div className="space-y-6 text-lg text-black leading-relaxed">
                <p>
                  Chúng tôi tin rằng mỗi công trình xây dựng không chỉ là việc xếp gạch lên nhau, 
                  mà là việc kiến tạo những không gian sống có ý nghĩa, nơi con người cảm thấy 
                  an toàn, thoải mái và được truyền cảm hứng mỗi ngày.
                </p>
                <p>
                  Sứ mệnh của Belden Brick là cung cấp những sản phẩm gạch không chỉ đẹp về mặt 
                  thẩm mỹ mà còn vượt trội về độ bền, khả năng chịu lực và tính thân thiện với môi trường. 
                  Chúng tôi cam kết sử dụng nguyên liệu sạch, áp dụng công nghệ tiên tiến để giảm thiểu 
                  tác động đến thiên nhiên.
                </p>
                <p>
                  Mỗi sản phẩm từ Belden Brick đều trải qua quá trình kiểm định nghiêm ngặt, 
                  đạt tiêu chuẩn quốc tế ISO 9001:2015. Chúng tôi tự hào khi sản phẩm của mình 
                  không chỉ phục vụ thị trường trong nước mà còn được xuất khẩu sang nhiều quốc gia 
                  trong khu vực Đông Nam Á.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInRight}
              className="md:order-1"
            >
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=800&fit=crop" 
                  alt="Quality Control"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInLeft}
              className="md:col-span-2"
            >
              <div className="aspect-[3/4] bg-gray-800 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop" 
                  alt="Modern Architecture"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInRight}
              className="space-y-8 md:col-span-3"
            >
              <h2 className="text-5xl font-bold text-black leading-tight">
                Tầm Nhìn<br />Tương Lai
              </h2>
              <div className="space-y-6 text-lg text-gray-900 leading-relaxed">
                <p>
                  Đến năm 2030, Belden Brick hướng tới mục tiêu trở thành thương hiệu gạch số 1 
                  Đông Nam Á về chất lượng và độ tin cậy. Chúng tôi không chỉ muốn là nhà sản xuất, 
                  mà còn là người đồng hành sáng tạo cùng các kiến trúc sư và nhà thiết kế trong việc 
                  hiện thực hóa những ý tưởng táo bạo nhất.
                </p>
                <p>
                  Chúng tôi đang đầu tư mạnh mẽ vào nghiên cứu và phát triển để tạo ra những dòng 
                  sản phẩm thế hệ mới: gạch thông minh có khả năng điều hòa nhiệt độ, gạch tái chế 
                  100% từ vật liệu xây dựng cũ, gạch tích hợp công nghệ năng lượng mặt trời.
                </p>
                <p>
                  Bên cạnh đó, Belden Brick cam kết đóng góp tích cực cho cộng đồng thông qua các 
                  chương trình xây dựng nhà tình thương, hỗ trợ đào tạo nghề cho thanh niên vùng khó khăn, 
                  và bảo vệ môi trường bằng cách trồng cây xanh, xử lý chất thải sản xuất đạt chuẩn 
                  quốc tế.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Giá Trị Cốt Lõi
            </h2>
            <div className="w-32 h-1 bg-black" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-24 gap-y-16">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInLeft}
              className="space-y-4"
            >
              <h3 className="text-3xl font-bold text-black">Chất Lượng Tuyệt Đối</h3>
              <p className="text-lg text-black leading-relaxed">
                Không có sự thỏa hiệp nào trong chất lượng. Mỗi viên gạch Belden đều phải vượt qua 
                15 bước kiểm tra nghiêm ngặt trước khi đến tay khách hàng. Chúng tôi sử dụng công nghệ 
                nung hiện đại từ Ý và Đức để đảm bảo độ cứng, độ bền màu và khả năng chống thấm 
                vượt trội.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInRight}
              className="space-y-4"
            >
              <h3 className="text-3xl font-bold text-black">Đổi Mới Không Ngừng</h3>
              <p className="text-lg text-black leading-relaxed">
                Đội ngũ R&D của chúng tôi làm việc không ngừng nghỉ để tìm ra những giải pháp mới, 
                từ thiết kế bề mặt độc đáo đến công nghệ sản xuất thân thiện môi trường. Mỗi năm, 
                chúng tôi ra mắt ít nhất 10 mẫu gạch mới với những tính năng và thẩm mỹ đột phá.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInLeft}
              className="space-y-4"
            >
              <h3 className="text-3xl font-bold text-black">Trách Nhiệm Xã Hội</h3>
              <p className="text-lg text-black leading-relaxed">
                Chúng tôi tin rằng thành công của doanh nghiệp gắn liền với trách nhiệm với cộng đồng. 
                Belden Brick đã xây dựng hơn 50 ngôi nhà tình thương, tạo việc làm cho hơn 1000 lao động 
                địa phương, và đầu tư vào các dự án bảo vệ môi trường như tái chế nước thải, giảm khí thải.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInRight}
              className="space-y-4"
            >
              <h3 className="text-3xl font-bold text-black">Khách Hàng Là Trung Tâm</h3>
              <p className="text-lg text-black leading-relaxed">
                Sự hài lòng của khách hàng là thước đo thành công của chúng tôi. Đội ngũ tư vấn và 
                chăm sóc khách hàng 24/7, chính sách bảo hành dài hạn, và cam kết hỗ trợ kỹ thuật 
                trọn đời là những gì làm nên sự khác biệt của Belden Brick.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-8">
              Đội Ngũ Của Chúng Tôi
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Hơn 300 kỹ sư, công nhân lành nghề và chuyên gia đang làm việc mỗi ngày 
              để mang đến những sản phẩm tốt nhất cho bạn.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="aspect-[3/4] bg-gray-800 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=800&fit=crop" 
                alt="Team Member"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="aspect-[3/4] bg-gray-800 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=800&fit=crop" 
                alt="Team Member"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="aspect-[3/4] bg-gray-800 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=800&fit=crop" 
                alt="Team Member"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight"
              variants={fadeInUp}
            >
              Hãy Cùng Chúng Tôi<br />
              Kiến Tạo Tương Lai
            </motion.h2>
            <motion.p 
              className="text-xl text-black mb-12 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Dù bạn là kiến trúc sư, nhà thầu hay chủ nhà đang tìm kiếm giải pháp gạch 
              chất lượng cho dự án của mình, chúng tôi luôn sẵn sàng đồng hành và tư vấn.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              variants={staggerContainer}
            >
              <motion.button 
                className="bg-black text-white font-semibold px-12 py-4 text-lg transition-all duration-300 hover:bg-gray-800"
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Liên Hệ Ngay
              </motion.button>
              <motion.button 
                className="border-2 border-black text-black font-semibold px-12 py-4 text-lg transition-all duration-300 hover:bg-black hover:text-white"
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Xem Portfolio
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}