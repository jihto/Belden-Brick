'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Package,
  AlertCircle,
  CheckCircle,
  Upload,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { apiClient } from '@/lib/api';
import { Product } from '@/types/products.types';
export default function ProductManagementPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  // const [categories, setCategories] = useState<string[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Load products
  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      loadProducts();
    }
  }, [isAuthenticated, user, searchTerm, selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getProducts({
        q: searchTerm || undefined,
        category: selectedCategory || undefined,
        limit: 50
      });

      if (response.success && response.data && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError('Error loading products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadProducts();
  };

  const handleDelete = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await apiClient.makeRequest(`/products/${productId}`, {
        method: 'DELETE'
      });

      if (response.success) {
        setProducts(products.filter(p => p.id !== productId));
      } else {
        setError('Failed to delete product');
      }
    } catch (err) {
      setError('Error deleting product');
      console.error('Error deleting product:', err);
    }
  };

  const toggleProductStatus = async (product: Product) => {
    try {
      const response = await apiClient.makeRequest(`/products/${product.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...product,
          isActive: !product.isActive
        })
      });

      if (response.success) {
        setProducts(products.map(p =>
          p.id === product.id ? { ...p, isActive: !p.isActive } : p
        ));
      } else {
        setError('Failed to update product status');
      }
    } catch (err) {
      setError('Error updating product status');
      console.error('Error updating product status:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated || user?.role !== 'admin') {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-2">
        {/* Header */}
        <div className="bg-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Quản lý sản phẩm
              </h1>
              <p className="text-gray-600 mt-2">
                Quản lý danh mục sản phẩm Belden Brick
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm sản phẩm
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white mb-8">
          <div className="flex justify-between gap-4">
            <div className='flex gap-2'>
                
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 min-w-md border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <Button onClick={handleSearch} className="w-fit">
                <Search className="h-6 w-6 mr-2" />
                Tìm kiếm
              </Button>
              </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Tất cả danh mục</option>
                <option value="Melamine">Melamine</option>
                <option value="Laminate">Laminate</option>
                <option value="Acrylic">Acrylic</option> 
              </select>
            </div>

          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-red-600">{error}</span>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tồn kho
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Không tìm thấy sản phẩm nào
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 relative">
                            {product.images && product.images.length > 0 ? (
                              <Image
                                className="h-12 w-12 rounded-lg object-cover"
                                src={product.imageUrl && product.imageUrl.startsWith('/uploads')
                                  ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${product.imageUrl}`
                                  : ''}
                                alt={product.name}
                                width={48}
                                height={48}
                              />
                            ) : product.imageUrl ? (
                              <Image
                                className="h-12 w-12 rounded-lg object-cover"
                                src={product.imageUrl.startsWith('/uploads')
                                  ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${product.imageUrl}`
                                  : product.imageUrl}
                                alt={product.name}
                                width={48}
                                height={48}
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                <Package className="h-6 w-6 text-gray-400" />
                              </div>
                            )} 
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              SKU: {product.sku}
                            </div>
                            {product.specifications?.dimensions && (
                              <div className="text-sm text-gray-500">
                                📏 {product.specifications.dimensions}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${Number(product.price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleProductStatus(product)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {product.isActive ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Hoạt động
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Tạm dừng
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Product Modal */}
        {(showCreateForm || editingProduct) && (
          <ProductForm
            product={editingProduct}
            onClose={() => {
              setShowCreateForm(false);
              setEditingProduct(null);
            }}
            onSave={(product) => {
              if (editingProduct) {
                setProducts(products.map(p => p.id === product.id ? product : p));
              } else {
                setProducts([product, ...products]);
              }
              setShowCreateForm(false);
              setEditingProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

// Product Form Component
interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

function ProductForm({ product, onClose, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || '',
    sku: product?.sku || '',
    stock: product?.stock || 0,
    specifications: product?.specifications || {},
    isActive: product?.isActive ?? true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedMainFile, setSelectedMainFile] = useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Initialize image preview when editing existing product
  useEffect(() => {
    // Set main image preview
    if (product?.imageUrl) {
      const imageUrl = product.imageUrl.startsWith('/uploads')
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${product.imageUrl}`
        : product.imageUrl;
      setMainImagePreview(imageUrl);
    } else {
      setMainImagePreview(null);
    }

    // Set additional images preview
    if (product?.images && product.images.length > 0) {
      const processedImages = product.images.map(img =>
        img.startsWith('/uploads')
          ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${img}`
          : img
      );
      setImagePreviews(processedImages);
    } else {
      setImagePreviews([]);
    }
  }, [product]);

  const handleMainImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setSelectedMainFile(file);
      setError('');

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setMainImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Validate files
      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          setError('Please select only image files');
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          setError('File size must be less than 5MB');
          return;
        }
      }

      setSelectedFiles(prev => [...prev, ...files]);
      setError('');

      // Create preview URLs
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeMainImage = () => {
    setSelectedMainFile(null);
    // Reset to original product main image or null
    if (product?.imageUrl) {
      const imageUrl = product.imageUrl.startsWith('/uploads')
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${product.imageUrl}`
        : product.imageUrl;
      setMainImagePreview(imageUrl);
    } else {
      setMainImagePreview(null);
    }
    setError('');
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setError('');
  };

  const removeAllImages = () => {
    setSelectedFiles([]);
    // Reset to original product images or empty
    if (product?.images && product.images.length > 0) {
      const processedImages = product.images.map(img =>
        img.startsWith('/uploads')
          ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${img}`
          : img
      );
      setImagePreviews(processedImages);
    } else if (product?.imageUrl) {
      const imageUrl = product.imageUrl.startsWith('/uploads')
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${product.imageUrl}`
        : product.imageUrl;
      setImagePreviews([imageUrl]);
    } else {
      setImagePreviews([]);
    }
    setError('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      // Validate files
      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          setError('Please select only image files');
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          setError('File size must be less than 5MB');
          return;
        }
      }

      setSelectedFiles(prev => [...prev, ...files]);
      setError('');

      // Create preview URLs
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.name.trim() || !formData.description.trim() || !formData.category.trim() || !formData.sku.trim()) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (formData.price <= 0 || formData.stock < 0) {
      setError('Price must be greater than 0 and stock must be 0 or greater');
      setLoading(false);
      return;
    }

    try {
      let response;

      // Kiểm tra xem có thay đổi dữ liệu không (ngoại trừ ảnh)
      const hasDataChanges = product ? (
        formData.name !== product.name ||
        formData.description !== product.description ||
        formData.price !== product.price ||
        formData.category !== product.category ||
        formData.sku !== product.sku ||
        formData.stock !== product.stock ||
        JSON.stringify(formData.specifications) !== JSON.stringify(product.specifications) ||
        formData.isActive !== product.isActive
      ) : true; // Nếu tạo mới thì luôn có thay đổi

      // Chỉ gọi API nếu có thay đổi dữ liệu hoặc có ảnh mới
      if (hasDataChanges || selectedMainFile || selectedFiles.length > 0) {
        response = product
          ? await apiClient.uploadProduct(`/products/${product.id}`, formData, {
            method: 'PUT'
          })
          : await apiClient.uploadProduct('/products', formData, {
            method: 'POST'
          });

        if (!product) {
          throw new Error("Something went wrong");
        }

        // Add all selected files as images
        if (selectedMainFile) {
          const updatedForm = new FormData();
          updatedForm.append("images", selectedMainFile);
          response = await apiClient.uploadFile(`/products/single-image/${product.id}`, updatedForm, {
            method: 'POST'
          });
        }
        if (selectedFiles.length > 0) {
          const updatedForm = new FormData();
          selectedFiles.forEach(file => {
            updatedForm.append("images", file);
          });
          response = await apiClient.uploadFile(`/products/multiple-images/${product.id}`, updatedForm, {
            method: 'POST'
          });
        }
      } else {
        // Không có thay đổi gì, trả về dữ liệu hiện tại
        response = {
          success: true,
          message: 'No changes detected',
          data: product
        };
      }

      if (response.success && response.data && typeof response.data === 'object' && 'id' in response.data) {
        onSave(response.data as Product);
      } else {
        setError(response.message || 'Failed to save product');
      }
    } catch (err) {
      setError('Error saving product');
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên sản phẩm *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU *
                </label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, price: value === '' ? 0 : parseFloat(value) || 0 });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Chọn danh mục</option> 
                  <option value="Melamine">Melamine</option>
                  <option value="Laminate">Laminate</option>
                  <option value="Acrylic">Acrylic</option> 
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tồn kho *
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, stock: value === '' ? 0 : parseInt(value) || 0 });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Specifications Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Thông số kỹ thuật</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kích thước
                  </label>
                  <input
                    type="text"
                    value={formData.specifications?.dimensions || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: {
                        ...formData.specifications,
                        dimensions: e.target.value
                      }
                    })}
                    placeholder="215mm x 102mm x 65mm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trọng lượng
                  </label>
                  <input
                    type="text"
                    value={formData.specifications?.weight || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: {
                        ...formData.specifications,
                        weight: e.target.value
                      }
                    })}
                    placeholder="2.8kg/viên"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cường độ nén
                  </label>
                  <input
                    type="text"
                    value={formData.specifications?.strength || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: {
                        ...formData.specifications,
                        strength: e.target.value
                      }
                    })}
                    placeholder="≥ 10 MPa"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hấp thụ nước
                  </label>
                  <input
                    type="text"
                    value={formData.specifications?.absorption || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: {
                        ...formData.specifications,
                        absorption: e.target.value
                      }
                    })}
                    placeholder="≤ 20%"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Màu sắc
                  </label>
                  <input
                    type="text"
                    value={formData.specifications?.color || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: {
                        ...formData.specifications,
                        color: e.target.value
                      }
                    })}
                    placeholder="Red, Brown, Gray..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chất liệu
                  </label>
                  <input
                    type="text"
                    value={formData.specifications?.material || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: {
                        ...formData.specifications,
                        material: e.target.value
                      }
                    })}
                    placeholder="Clay, Concrete, Stone..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đặc điểm nổi bật (mỗi dòng một đặc điểm)
                </label>
                <textarea
                  value={formData.specifications?.features?.join('\n') || ''}
                  onChange={(e) => {
                    const features = e.target.value.split('\n').filter(f => f.trim());
                    setFormData({
                      ...formData,
                      specifications: {
                        ...formData.specifications,
                        features: features
                      }
                    });
                  }}
                  rows={3}
                  placeholder="Chất lượng cao, bền vững theo thời gian&#10;Thân thiện với môi trường&#10;Dễ dàng thi công và bảo trì"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Mỗi dòng sẽ tạo thành một đặc điểm riêng biệt
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Image Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh chính *
                </label>

                {/* Main Image Preview */}
                {mainImagePreview && (
                  <div className="mb-4 relative inline-block">
                    <Image
                      width={128}
                      height={128}
                      src={mainImagePreview}
                      alt="Main product preview"
                      className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                    />
                    {selectedMainFile && (
                      <button
                        type="button"
                        onClick={removeMainImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}

                {/* Main Image Upload */}
                <label
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-3 pb-3">
                    <Upload className="w-6 h-6 mb-1 text-gray-400" />
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold">Click to upload</span> main image
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageSelect}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Additional Images Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh bổ sung
                </label> 
                {/* Additional Images Preview */}
                {imagePreviews.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        {imagePreviews.length} hình ảnh bổ sung
                      </span>
                      <button
                        type="button"
                        onClick={removeAllImages}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <Image
                            width={64}
                            height={64}
                            src={preview}
                            alt={`Additional preview ${index + 1}`}
                            className="h-16 w-16 object-cover rounded-lg border border-gray-300"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Images Upload */}
                <label
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center pt-3 pb-3">
                    <Upload className="w-6 h-6 mb-1 text-gray-400" />
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">Multiple images</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Sản phẩm hoạt động
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {(selectedMainFile || selectedFiles.length > 0) ? 'Đang tải lên...' : 'Đang xử lý...'}
                  </div>
                ) : (
                  <div className="flex items-center">
                    {(selectedMainFile || selectedFiles.length > 0) && <Upload className="h-4 w-4 mr-2" />}
                    {product ? 'Cập nhật' : 'Tạo mới'}
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
