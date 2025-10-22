'use client'

import React from 'react'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin,
  Download,
  ArrowRight
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'Giới thiệu', href: '/about' },
      { label: 'Lịch sử phát triển', href: '/history' },
      { label: 'Tầm nhìn sứ mệnh', href: '/vision' },
      { label: 'Tin tức', href: '/news' }
    ],
    products: [
      { label: 'Gạch ốp tường', href: '/products/wall-tiles' },
      { label: 'Gạch lát nền', href: '/products/floor-tiles' },
      { label: 'Gạch trang trí', href: '/products/decorative-tiles' },
      { label: 'Gạch ngoại thất', href: '/products/exterior-tiles' }
    ],
    solutions: [
      { label: 'Nhà ở gia đình', href: '/solutions/residential' },
      { label: 'Chung cư cao cấp', href: '/solutions/apartment' },
      { label: 'Thương mại & văn phòng', href: '/solutions/commercial' },
      { label: 'Công nghiệp & kho bãi', href: '/solutions/industrial' }
    ],
    support: [
      { label: 'Hướng dẫn thi công', href: '/support/installation' },
      { label: 'Bảo hành sản phẩm', href: '/support/warranty' },
      { label: 'Liên hệ tư vấn', href: '/support/contact' },
      { label: 'Tải catalog', href: '/download-catalog' }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ]

  return (
    <footer className="bg-gradient-to-br from-green-900 to-emerald-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                Belden Brick
              </h3>
              <p className="text-green-100 text-lg leading-relaxed mb-6">
                Nhà sản xuất gạch hàng đầu Việt Nam với hơn 20 năm kinh nghiệm, 
                cam kết mang đến những sản phẩm chất lượng cao và giải pháp toàn diện 
                cho mọi công trình.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-green-400" size={20} />
                <span className="text-green-100">
                  Khu Công Nghiệp Bình Dương, Tỉnh Bình Dương, Việt Nam
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-green-400" size={20} />
                <span className="text-green-100">+84 274 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-green-400" size={20} />
                <span className="text-green-100">info@beldenbrick.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-green-800 hover:bg-green-700 p-3 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xl font-semibold text-green-300 mb-6">Công ty</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-green-100 hover:text-green-300 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-xl font-semibold text-green-300 mb-6">Sản phẩm</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-green-100 hover:text-green-300 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="text-xl font-semibold text-green-300 mb-6">Giải pháp</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-green-100 hover:text-green-300 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter & Download */}
        <div className="mt-12 pt-8 border-t border-green-700">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Newsletter */}
            <div>
              <h4 className="text-xl font-semibold text-green-300 mb-4">
                Đăng ký nhận tin tức
              </h4>
              <p className="text-green-100 mb-4">
                Nhận thông tin mới nhất về sản phẩm và xu hướng thiết kế
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="flex-1 px-4 py-3 rounded-lg bg-green-800 border border-green-700 text-white placeholder-green-300 focus:outline-none focus:border-green-400"
                />
                <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg transition-colors duration-200">
                  Đăng ký
                </button>
              </div>
            </div>

            {/* Download Catalog */}
            <div>
              <h4 className="text-xl font-semibold text-green-300 mb-4">
                Tải catalog sản phẩm
              </h4>
              <p className="text-green-100 mb-4">
                Tải xuống catalog đầy đủ với tất cả sản phẩm và thông số kỹ thuật
              </p>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2">
                <Download size={20} />
                Tải catalog PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-green-950 border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-green-300 text-sm">
              © {currentYear} Belden Brick. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-green-300 hover:text-green-200 transition-colors duration-200">
                Chính sách bảo mật
              </a>
              <a href="/terms" className="text-green-300 hover:text-green-200 transition-colors duration-200">
                Điều khoản sử dụng
              </a>
              <a href="/sitemap" className="text-green-300 hover:text-green-200 transition-colors duration-200">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer