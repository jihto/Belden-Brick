'use client'

import { useEffect, useState } from 'react'; 
import { Maximize, ChevronLeft, ChevronRight } from 'lucide-react'; 
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
  console.log("hero", project);
  return (
    <>
    <HeroBanner
      title={project.title}
      subtitle={project.description}
      backgroundImage={project.imageUrl} 
    /> 

      {/* Product Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content Left */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h2>
                <div className="w-24 h-1 bg-green-600 mb-6"></div>
                
                <div className="space-y-4 text-gray-700">
                  <p className="text-lg leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Product Info */}
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Danh mục:</span>
                        <p className="font-medium text-green-600">{project.category}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">SKU:</span>
                        <p className="font-medium">{project.sku}</p>
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
                  
                  {/* Product Specifications */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Thông số kỹ thuật</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Kích thước:</span>
                        <p className="font-medium">{project.specifications?.dimensions}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Trọng lượng:</span>
                        <p className="font-medium">{project.specifications?.weight}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Cường độ nén:</span>
                        <p className="font-medium">{project.specifications?.strength}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Hấp thụ nước:</span>
                        <p className="font-medium">{project.specifications?.absorption}</p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Đặc điểm nổi bật</h3>
                    <ul className="space-y-2">
                      {project.specifications?.features?.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div> 
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                      Yêu cầu báo giá
                    </button>
                    <button className="border border-green-600 text-green-600 hover:bg-green-50 font-semibold px-8 py-3 rounded-lg transition-colors">
                      Tải catalog
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Images Right */}
            {project.images && project.images.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Hình ảnh sản phẩm</h3>
                
                {/* Main Image */}
                <div className="relative">
                  <div
                    className="relative overflow-hidden rounded-lg shadow-lg h-[400px] cursor-zoom-in group"
                    onClick={() => project.images && openImageDialog(project.images[0])}
                  >
                    <Image
                      src={project.images[0]}
                      alt={project.title || ''}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Maximize className="text-white w-10 h-10" />
                    </div>
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {project.images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg shadow-md h-32 cursor-zoom-in group"
                      onClick={() => openImageDialog(image)}
                    >
                      <Image
                        src={image && image.startsWith('/uploads')
                          ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${image}`
                          : image}
                        alt={project.title || ''}
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Maximize className="text-white w-6 h-6" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                {project.images && project.images.length > 4 && (
                  <button
                    onClick={() => project.images && openImageDialog(project.images[0])}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors"
                  >
                    Xem tất cả {project.images.length} hình ảnh
                  </button>
                )}
              </div>
            )}
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
                  ({selectedImageIndex + 1}/
                  {project.images.length})
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
