'use client';

import React from 'react';
import { AuthDemo } from '@/components/AuthDemo';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AuthDemoPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại trang chủ
          </Link>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Demo Quản lý Phiên Đăng Nhập
          </h1>
          <p className="text-gray-600 mt-2">
            Trang này demo các tính năng duy trì đăng nhập và quản lý session
          </p>
        </div>

        {/* Demo Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Auth Demo Component */}
          <div className="lg:col-span-1">
            <AuthDemo />
          </div>

          {/* Instructions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Hướng dẫn sử dụng</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-green-600 mb-2">1. Đăng nhập</h3>
                  <p className="text-sm text-gray-600">
                    Sử dụng trang login để đăng nhập với tài khoản của bạn. 
                    Nhớ tick vào "Ghi nhớ đăng nhập" để test tính năng auto-refresh.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-green-600 mb-2">2. Kiểm tra thông tin</h3>
                  <p className="text-sm text-gray-600">
                    Sau khi đăng nhập, bạn sẽ thấy thông tin user và token ở bên trái. 
                    Thời gian còn lại của token sẽ được hiển thị.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-green-600 mb-2">3. Test auto-refresh</h3>
                  <p className="text-sm text-gray-600">
                    Nếu bạn đã bật "Ghi nhớ đăng nhập", token sẽ được tự động refresh mỗi 6 giờ.
                    Bạn cũng có thể thử refresh token thủ công bằng nút "Refresh Token".
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-green-600 mb-2">4. Test session warning</h3>
                  <p className="text-sm text-gray-600">
                    Khi token sắp hết hạn (5 phút trước), sẽ có modal cảnh báo hiện lên.
                    Bạn có thể chọn gia hạn hoặc đăng xuất.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-green-600 mb-2">5. Test persistence</h3>
                  <p className="text-sm text-gray-600">
                    Thử refresh trang hoặc đóng/mở lại browser. 
                    Nếu đã bật "Ghi nhớ đăng nhập", bạn sẽ vẫn đăng nhập.
                  </p>
                </div>
              </div>

              {!isAuthenticated && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Lưu ý:</strong> Bạn cần đăng nhập trước để xem demo đầy đủ.
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/login'}
                    className="mt-3"
                  >
                    Đăng nhập ngay
                  </Button>
                </div>
              )}
            </div>

            {/* Features List */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Tính năng đã implement</h2>
              
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-sm">Lưu token trong localStorage</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-sm">Tính năng "Ghi nhớ đăng nhập"</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-sm">Tự động refresh token</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-sm">Cảnh báo session sắp hết hạn</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-sm">Xử lý lỗi tự động</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-sm">Auto-retry khi token hết hạn</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="text-sm">Cleanup dữ liệu khi đăng xuất</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
