'use client'

import { useEffect, useState } from 'react';
import { Maximize, ChevronLeft, ChevronRight, Phone, Mail, MapPin, CheckCircle, Star, Download, Palette, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import HeroBanner from '../HeroBanner';
import { Product } from '@/types/products.types';
import { apiClient } from '@/lib/api';
import Image from 'next/image';

const ProjectDetail = ({ slug }: { slug: string }) => {
  const [project, setProject] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0); 

  // Mock data for sections not in API
  const colorOptions = [
    { id: 'default', name: 'Mặc định', color: '#8B4513', image: '/api/placeholder/200/150' },
    { id: 'white', name: 'Trắng', color: '#FFFFFF', image: '/api/placeholder/200/150' },
    { id: 'black', name: 'Đen', color: '#000000', image: '/api/placeholder/200/150' },
    { id: 'gray', name: 'Xám', color: '#808080', image: '/api/placeholder/200/150' },
    { id: 'brown', name: 'Nâu', color: '#A0522D', image: '/api/placeholder/200/150' },
  ];

  const productBenefits = [
    {
      title: "Chất liệu Inox 304 cao cấp",
      description: "Khung tủ bếp được chế tạo từ inox 304, chất lượng đã được kiểm định và cấp giấy chứng nhận. Sản phẩm được sản xuất bằng công nghệ tiên tiến nhất trong ngành cơ khí.",
      icon: <Star className="w-6 h-6 text-green-600" />
    },
    {
      title: "Kết cấu tủ bếp Module tinh tế",
      description: "Kết cấu module với nhiều khoang tủ ghép nối không chỉ có thẩm mỹ tinh tế mà còn chịu được tải trọng cao, khác biệt hoàn toàn với các loại tủ bếp inox trên thị trường.",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />
    },
    {
      title: "Cánh kính cường lực an toàn và sang trọng",
      description: "Cánh kính cường lực dày 5mm được bo góc tinh tế, đảm bảo tính thẩm mỹ và an toàn cho người sử dụng. Loại kính siêu trong này có khả năng xuyên sáng lên đến 90%.",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />
    },
    {
      title: "Tính năng bảo vệ và thân thiện với môi trường",
      description: "Sản phẩm có khả năng chống ẩm mốc, chống thấm nước, chống mối mọt và chống cháy tuyệt đối, đồng thời thân thiện với môi trường.",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />
    }
  ];

  const relatedProducts = [
    {
      id: 1,
      name: "Mẫu tủ bếp inox cánh kính cường lực CK32",
      material: "Tủ bếp inox cánh kính",
      style: "Chữ l - Hiện đại",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Mẫu tủ bếp inox cánh kính cường lực CK21",
      material: "Tủ bếp inox cánh kính",
      style: "Chữ l - Hiện đại",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Mẫu tủ bếp inox cánh kính cường lực CK89",
      material: "Tủ bếp inox cánh kính",
      style: "Chữ i - Hiện đại",
      image: "/api/placeholder/300/200"
    }
  ];

  const contactInfo = {
    phone: "0978 566 535",
    phone2: "0977 097 588",
    email: "info@belden-brick.com",
    address: "Tòa nhà Belden Brick, số 10/1 ngõ 168 Nguyễn Xiển, Hạ Đình, Thanh Xuân, Hà Nội"
  };

  // Mock featured news data
  const featuredNews = [
    {
      id: 1,
      title: "Vinakit công bố sản phẩm tủ bếp Inox CNC 2026 – Bề mặt Inox hiệu...",
      date: "15/01/2025",
      excerpt: "Sản phẩm mới với công nghệ hiện đại"
    },
    {
      id: 2,
      title: "VINAKIT tuyển dụng nhân viên kinh doanh T5/2025 – 3 cở sở",
      date: "10/01/2025",
      excerpt: "Cơ hội nghề nghiệp hấp dẫn"
    },
    {
      id: 3,
      title: "THÔNG BÁO DI CHUYỂN SHOWROOM VINAKIT HÀ NỘI",
      date: "05/01/2025",
      excerpt: "Showroom mới với không gian lớn hơn"
    },
    {
      id: 4,
      title: "Vinakit Hải Phòng tuyển dụng chuyên viên thiết kế lương cao",
      date: "01/01/2025",
      excerpt: "Môi trường làm việc chuyên nghiệp"
    },
    {
      id: 5,
      title: "20 Xu hướng thiết kế nội thất 2025 với những phong cách không thể bỏ qua",
      date: "28/12/2024",
      excerpt: "Những xu hướng thiết kế mới nhất"
    }
  ];

  // Fetch product data from server
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Convert slug to product ID (assuming slug is the product ID)
        const productId = parseInt(slug);
        if (isNaN(productId)) {
          throw new Error('Invalid product ID');
        }

        const response = await apiClient.makeRequest(`/products/${productId}`);

        if (response.success && response.data) {
          const productData = response.data as Product;

          // Transform the API data to match the expected format
          const transformedProduct: Product = {
            ...productData,
            title: productData.name,
            imageUrl: productData.imageUrl ?
              (productData.imageUrl.startsWith('/uploads')
                ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${productData.imageUrl}`
                : productData.imageUrl) : '',
            images: (productData.images || [productData.imageUrl || ''])
              .filter(Boolean)
              .map(img => img.startsWith('/uploads')
                ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${img}`
                : img),
            specifications: productData.specifications || {
              dimensions: '',
              weight: '',
              strength: '',
              absorption: '',
              color: '',
              material: '',
              features: []
            }
          };

          setProject(transformedProduct);
        } else {
          throw new Error(response.message || 'Failed to fetch product');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const openImageDialog = (image: string) => {
    setSelectedImage(image);
    if (project && project.images) {
      // Find the index of the selected image
      const index = project.images.findIndex((img: string) => img === image);
      setSelectedImageIndex(index);
    }
  };

  const closeImageDialog = () => {
    setSelectedImage(null);
  };

  const showNextImage = () => {
    if (!project || !project.images) return;

    const nextIndex = (selectedImageIndex + 1) % project.images.length;
    setSelectedImageIndex(nextIndex);
    setSelectedImage(project.images[nextIndex]);
  };

  const showPreviousImage = () => {
    if (!project || !project.images) return;

    const prevIndex = (selectedImageIndex - 1 + project.images.length) % project.images.length;
    setSelectedImageIndex(prevIndex);
    setSelectedImage(project.images[prevIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPreviousImage();
      } else if (e.key === 'Escape') {
        closeImageDialog();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedImageIndex, project]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-md p-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-red-800 mb-2">Lỗi tải sản phẩm</h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
          <p className="text-gray-600">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Product Header Section */}
      <section className="py-8 bg-white mt-12">
        <div className="container mx-auto px-4 grid grid-cols-5 gap-5 md:gap-10 "> 
          {/* Product Images Section */}
          {project.images && project.images.length > 0 && (
            <section className="bg-white col-span-3">
              <div className="container mx-auto px-4">  
                {/* Main Image */}
                <div className="mb-8">
                  <div
                    className="relative overflow-hidden rounded-lg shadow-lg h-[500px] cursor-zoom-in group"
                    onClick={() => project.images && openImageDialog(project.images[0])}
                  >
                    <Image
                      src={project.images[0]}
                      alt={project.title || ''}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Maximize className="text-white w-12 h-12" />
                    </div>
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.images.slice(1).map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg shadow-md h-36 cursor-zoom-in group"
                      onClick={() => openImageDialog(image)}
                    >
                      <Image
                        src={image && image.startsWith('/uploads')
                          ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${image}`
                          : image}
                        alt={project.title || ''}
                        className="w-full h-full object-cover"
                        width={300}
                        height={200}
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Maximize className="text-white w-8 h-8" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          <div className="col-span-2 text-start mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {project.title}
              </h1>
            {/* Product Description */}
            <div className="prose max-w-none my-5">
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                {project.description}
              </p>
            </div>
            <div className="text-sm text-gray-600 flex justify-between mb-6">
              <p>Hỗ trợ tư vấn: <span className="font-semibold text-green-600">{contactInfo.phone}</span></p>
              <p>Khảo sát thiết kế: <span className="font-semibold text-green-600">{contactInfo.phone2}</span></p>
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2 w-full justify-center">
                <Download className="w-5 h-5" />
                Đăng ký nhận báo giá
              </button>
            </div>
          </div>
        </div>
      </section>
      <hr className='container mx-auto my-6 border-gray-200'/>
      {/* Product Information Section */}
      <section className="container mx-auto py-6 bg-white grid grid-cols-12">
        <div className=" px-4 col-span-8">
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Thông tin mẫu thiết kế</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Mã sản phẩm:</span>
                  <p className="font-medium text-lg">{project.sku || 'CK37'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Kiểu dáng - Phong cách:</span>
                  <p className="font-medium">Chữ L - Hiện đại</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Danh mục:</span>
                  <p className="font-medium text-green-600">{project.category || 'Tủ bếp Inox CNC'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Kích thước:</span>
                  <p className="font-medium">{project.specifications?.dimensions || '5m'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Giá:</span>
                  <p className="font-medium text-green-600 text-lg">
                    {Number(project.price).toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Tồn kho:</span>
                  <p className="font-medium">{project.stock} sản phẩm</p>
                </div>
              </div>
            </div>
          </div> 

          {/* Technical Specifications Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
            <div className="bg-gray-50 px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-900">Thông số kỹ thuật cơ bản</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm md:text-base font-medium text-gray-500">Hạng mục</th>
                    <th className="px-6 py-3 text-left text-sm md:text-base font-medium text-gray-500">Thông số kỹ thuật</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm md:text-base font-medium text-gray-900">Vật liệu khung tủ</td>
                    <td className="px-6 py-4 text-sm md:text-base text-gray-700">Inox 304 không sơn tĩnh điện</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm md:text-base font-medium text-gray-900">Vật liệu cánh tủ</td>
                    <td className="px-6 py-4 text-sm md:text-base text-gray-700">Cánh kính cường lực</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm md:text-base font-medium text-gray-900">Kích thước tiêu chuẩn</td>
                    <td className="px-6 py-4 text-sm md:text-base text-gray-700">Cao x Rộng x Sâu (tùy chỉnh theo mặt bằng thực tế)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm md:text-base font-medium text-gray-900">Màu sắc</td>
                    <td className="px-6 py-4 text-sm md:text-base text-gray-700">Tùy chọn theo yêu cầu của khách hàng</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm md:text-base font-medium text-gray-900">Kiểu dáng</td>
                    <td className="px-6 py-4 text-sm md:text-base text-gray-700">Hệ tủ bếp chữ L</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm md:text-base font-medium text-gray-900">Phụ kiện kèm theo</td>
                    <td className="px-6 py-4 text-sm md:text-base text-gray-700">Giá bát di động, tay nâng Blum, ngăn kéo, giá dao thớt, giá gia vị …</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm md:text-base font-medium text-gray-900">Bảo hành</td>
                    <td className="px-6 py-4 text-sm md:text-base text-gray-700">Bảo hành khung tủ 10 năm, cánh tủ 5 năm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-span-4 px-4">
          {/* Featured News Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="bg-green-600 px-6 py-4 rounded-t-lg">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Star className="w-6 h-6" />
                Tin nổi bật
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {featuredNews.map((news, index) => (
                  <li key={news.id} className="border-b border-gray-200 last:border-b-0 last:pb-0 pb-4 last:mb-0">
                    <a href="#" className="group block">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-1 h-1 bg-green-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors mb-1 line-clamp-2">
                            {news.title}
                          </h4>
                          <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                            {news.excerpt}
                          </p>
                          <p className="text-xs text-gray-400">{news.date}</p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* View All News Link */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <a 
                  href="#" 
                  className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2 transition-colors"
                >
                  Xem tất cả tin tức
                  <ChevronRightIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Contact Card */}
          <div className="bg-gray-50 rounded-lg p-6 mt-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hỗ trợ trực tuyến</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Tư vấn</p>
                  <p className="font-semibold text-gray-900">{contactInfo.phone}</p>
                </div>
              </div> 
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{contactInfo.email}</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
              Liên hệ ngay
            </button>
          </div> 
        </div>
      </section>

      {/* Why Choose This Product Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Tại sao nên chọn {project.title}?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {productBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Tham khảo thêm
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Chất liệu:</span> {product.material}</p>
                    <p><span className="font-medium">Kiểu dáng - Phong cách:</span> {product.style}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Image Zoom Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={closeImageDialog}>
        <DialogContent className="max-w-6xl w-[90vw] max-h-[90vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <DialogClose
              className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
              onClick={closeImageDialog}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </DialogClose>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPreviousImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 rounded-full p-2 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="text-white w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 rounded-full p-2 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="text-white w-8 h-8" />
            </button>

            {selectedImage && (
              <Image
                src={selectedImage && selectedImage.startsWith('/uploads')
                  ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${selectedImage}`
                  : selectedImage}
                alt={selectedImage || ''}
                width={900}
                height={900}
                className="max-w-full max-h-[85vh] object-contain"
              />
            )}

            {/* Caption */}
            {selectedImage && project.images && (
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="bg-black/50 inline-block px-4 py-2 rounded text-white">
                  ({selectedImageIndex + 1}/{project.images.length})
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectDetail;